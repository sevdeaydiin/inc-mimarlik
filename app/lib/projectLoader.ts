import Project, { ProjectDTO } from '@/app/models/Project';

/**
 * Data klasöründen tüm projeleri yükler ve Project instance'larına dönüştürür
 */
export async function loadProjects(): Promise<Project[]> {
  try {
    const projectsData: ProjectDTO[] = await import('@/app/data/projects.json').then(m => m.default);
    
    return projectsData.map(
      (data) =>
        new Project({
          id: data.id,
          name: data.name,
          description: data.description || "",
          images: data.images || [],
          category: data.category,
        })
    );
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

/**
 * ID ile belirli bir projeyi yükler
 */
export async function loadProjectById(id: number | string): Promise<Project | null> {
  try {
    const projects = await loadProjects();
    return projects.find(p => p.id === id) || null;
  } catch (error) {
    console.error(`Error loading project with id ${id}:`, error);
    return null;
  }
}

/**
 * Kategoriye göre projeleri filtreler
 */
export async function loadProjectsByCategory(category: string): Promise<Project[]> {
  try {
    const projects = await loadProjects();
    return projects.filter(p => p.category === category);
  } catch (error) {
    console.error(`Error loading projects by category ${category}:`, error);
    return [];
  }
}
