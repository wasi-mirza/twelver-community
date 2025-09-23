declare module '*.graphql' {
  import { DocumentNode } from 'graphql';
  export const content: DocumentNode;
  export default content;
}
