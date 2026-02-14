import {
  Injectable,
  Logger,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreatePlayerDto } from './player/dto/create-player.dto';
import { UpdatePlayerDto } from './player/dto/update-player.dto';
import { Repository } from 'typeorm';
import { Player } from './player/entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async register(createPlayerDto: CreatePlayerDto) {
    const email = createPlayerDto.email.trim().toLowerCase();
    const existingUser = await this.playerRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      this.logger.warn(`Registration failed: ${email} already exists`);
      throw new ConflictException('Email already exists');
    }
    const newPlayer = this.playerRepository.create({
      id: uuidv4(),
      email,
      name: createPlayerDto.name,
      password: createPlayerDto.password,
      createdAt: new Date().toISOString(), // string type as per your entity
      role: createPlayerDto.role ?? 'PLAYER',
    });
    const savedUser = await this.playerRepository.save(newPlayer);

    return {
      id: savedUser.id,
      email: savedUser.email,
      name: savedUser.name,
      role: savedUser.role,
    };
  }

  async findAll() {
    return await this.playerRepository.find();
  }

  async findOneUser(email: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await this.playerRepository.findOne({
      where: { email: normalizedEmail },
    });

    if (!user) {
      this.logger.log(`No user found with email: ${email}`);
      return null;
    }

    this.logger.log(`User found: ${JSON.stringify(user)}`);
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  findOne(id: string) {
    return `This action returns a #${id} player`;
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const player = await this.playerRepository.findOne({ where: { id } });
    if (!player) throw new NotFoundException('Player not found');

    const safeUpdate: Partial<Player> = updatePlayerDto;

    Object.assign(player, safeUpdate);
    return await this.playerRepository.save(player);
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
