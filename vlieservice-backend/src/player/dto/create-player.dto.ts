import {
  IsEmail,
  IsString,
  IsOptional,
  MinLength,
  IsEnum,
} from 'class-validator';

export class CreatePlayerDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsEnum(['PLAYER', 'admin'])
  @IsOptional()
  role?: 'PLAYER' | 'admin';

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  nationality?: string;

  @IsString()
  @IsOptional()
  dateOfBirth?: string;

  @IsOptional()
  height?: number;

  @IsOptional()
  weight?: number;

  @IsOptional()
  position?: string[];

  @IsString()
  @IsOptional()
  preferredFoot?: string;

  @IsOptional()
  currentClub?: {
    name?: string;
    league?: string;
    country?: string;
    since?: string;
  };

  @IsOptional()
  previousClubs?: {
    name?: string;
    from?: string;
    to?: string;
  }[];

  @IsOptional()
  careerStats?: {
    appearances?: number;
    goals?: number;
    assists?: number;
    yellowCards?: number;
    redCards?: number;
  };

  @IsString()
  @IsOptional()
  bio?: string;

  @IsOptional()
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    website?: string;
  };

  @IsOptional()
  videos?: {
    title?: string;
    url?: string;
  }[];

  @IsOptional()
  agentContact?: {
    name?: string;
    phone?: string;
    email?: string;
  };

  @IsOptional()
  isAvailableForTransfer?: boolean;
}
