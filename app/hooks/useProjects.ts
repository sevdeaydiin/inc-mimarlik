import { useEffect, useState } from 'react';
import Project from '@/app/models/Project';
import { loadProjects } from '@/app/lib/projectLoader';

/**
 * Data klasöründen projeleri yükleyen custom hook
 */
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const loadedProjects = await loadProjects();
        setProjects(loadedProjects);
        setError(null);
      } catch (err) {
        console.error('Failed to load projects:', err);
        setError('Projeler yüklenirken bir hata oluştu');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error };
}
