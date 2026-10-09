export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl: string;
  liveDemoUrl: string;
  featured?: boolean;
}
