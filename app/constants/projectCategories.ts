export enum ProjectCategory {
  ALL = "ALL",
  RESIDENTIAL = "Konut",
  INTERIOR = "İç Mekan",
  OFFICE = "Ofis",
  LANDSCAPE = "Peyzaj"
}

export const getCategoryDisplayName = (category: ProjectCategory | string): string => {
  switch (category) {
    case ProjectCategory.ALL:
      return "Tümü";
    case ProjectCategory.RESIDENTIAL:
      return "Konut";
    case ProjectCategory.OFFICE:
      return "Ofis";
    case ProjectCategory.INTERIOR:
      return "İç Mekan";
    case ProjectCategory.LANDSCAPE:
      return "Peyzaj";
    default:
      return category;
  }
};

export const CATEGORIES = [
  ProjectCategory.ALL,
  ProjectCategory.RESIDENTIAL,
  ProjectCategory.OFFICE,
  ProjectCategory.INTERIOR,
  ProjectCategory.LANDSCAPE
];
