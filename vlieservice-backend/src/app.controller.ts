import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePlayerDto } from './player/dto/create-player.dto';
import { UpdatePlayerDto } from './player/dto/update-player.dto';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

interface AuthenticatedRequest extends Request {
  user: { role: string; userId: string };
}

@Controller('player')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('register')
  register(@Body() createPlayerDto: CreatePlayerDto) {
    return this.appService.register(createPlayerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Only admin can view all profiles');
    }
    return this.appService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const user = req.user;
    if (user.role === 'PLAYER' && user.userId === id) {
      return this.appService.findOne(id);
    }
    throw new ForbiddenException('You are not allowed to view this profile');
  }

  @Post('login')
  findOneUser(@Body('email') email: string) {
    console.log('Finding user with email:', email);
    return this.appService.findOneUser(email);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = req.user;
    if (user.role === 'PLAYER' && user.userId !== id) {
      throw new ForbiddenException('You can only update your own profile');
    }
    return this.appService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.remove(+id);
  }
}
