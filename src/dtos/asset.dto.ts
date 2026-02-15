// DTO = Data Transfer Object

export interface CreateAssetDTO {
  title: string;
  description: string;
  mac: string;
  link: string;
}

export interface UpdateAssetDTO {
  title?: string;
  description?: string;
  mac?: string;
  link?: string;
}
