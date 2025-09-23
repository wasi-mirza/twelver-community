import { NextFunction, Request, Response } from 'express';
import admin from 'firebase-admin';
import serviceAccount from '../../service-file.json'; 
import { ensureUserFromFirebase } from './users';

// Initialize Firebase Admin SDK (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  });
}

export async function verifyFirebaseToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    const apiKey = (req.headers['apikey'] as string | undefined) || (req.query.apiKey as string | undefined);

    // Allow API key bypass for local/dev
    if (apiKey === process.env.API_KEY) {
      const developmentEmail = process.env.DEVELOPMENT_EMAIL_ID;
      if (!developmentEmail) {
        return res.status(401).json({ error: 'Unauthorized: Missing DEVELOPMENT_EMAIL_ID' });
      }

      const user = await ensureUserFromFirebase({
        uid: 'dev-api-key',
        email: developmentEmail,
        name: 'Developer User',
      });

      (req as any).user = user;
      return next();
    }

    // Require Bearer token
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }

    // Verify Firebase ID token
    const decoded = await admin.auth().verifyIdToken(token);

    const user = await ensureUserFromFirebase({
      uid: decoded.uid,
      email: decoded.email,
      name: (decoded as any).name,
    });

    (req as any).user = user;
    return next();
  } catch (err) {
    console.error('Error verifying Firebase token:', err);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}
