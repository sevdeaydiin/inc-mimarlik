import { ProjectCategory } from '@/app/constants/projectCategories';

export interface ProjectsPageProject {
  id: number;
  title: string;
  category: ProjectCategory | string;
  coverImage: string;
  images: string[];
  description: string;
}
