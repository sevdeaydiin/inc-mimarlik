import { ProjectCategory } from '@/app/constants/projectCategories';

export interface ProjectDTO {
  id: number | string;
  name: string;
  description?: string;
  images: string[]; // JSON için array kullanıyoruz
  category?: ProjectCategory | string;
}

export default class Project {
  public id: number | string;
  public name: string;
  public description: string;
  private imagesSet: Set<string>;
  public category?: ProjectCategory | string;

  constructor({
    id,
    name,
    description = "",
    images = [],
    category,
  }: {
    id: number | string;
    name: string;
    description?: string;
    images?: string[]; // init ile array alıyoruz
    category?: string;
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagesSet = new Set(images);
    this.category = category;
  }

  /**
   * Tüm görselleri array olarak döndürür
   */
  public getImages(): string[] {
    return Array.from(this.imagesSet);
  }

  /**
   * Yeni görsel ekler
   */
  public addImage(image: string): void {
    this.imagesSet.add(image);
  }

  /**
   * Görsel kaldırır
   */
  public removeImage(image: string): void {
    this.imagesSet.delete(image);
  }

  /**
   * Görsel sayısını döndürür
   */
  public getImageCount(): number {
    return this.imagesSet.size;
  }

  /**
   * Projeyi DTO olarak döndürür (JSON serialization için)
   */
  public toDTO(): ProjectDTO {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      images: this.getImages(),
      category: this.category,
    };
  }
}
