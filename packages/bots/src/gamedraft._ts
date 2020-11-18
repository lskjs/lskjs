/* eslint-disable max-classes-per-file */

import join from 'lodash/join';
import find from 'lodash/find';
import every from 'lodash/every';
import maxBy from 'lodash/maxBy';
import pullAll from 'lodash/pullAll';
import some from 'lodash/some';
import range from 'lodash/range';
import map from 'lodash/map';
import sum from 'lodash/sum';
import random from 'lodash/random';
import Module from '@lskjs/module';
// import join from 'lodash/join';

export interface Character {
  name: string;
  attack: string;
  defence: string;
}

// ////////// GameS

export class App {
  rooms = {
    dice: {
      Game: DiceMoreGame,
    },
    rps: {
      Game: RockPaperScissorsGame,
    },
    rps5: {
      Game: RockPaperScissorsGame,
      config: { elements: 5 },
    },
  };
  roomsLobby = {
    dice: [
      {
        date,
        user,
      },
    ],
  };

  public wantToPlay(roomName: string, user: User): void {
    this.roomsLobby[roomName].push({ user, date: new Date() });
    if (this.roomsLobby[roomName] > 3) {
      await this.startNewGame(roomName);
    }
  }

  public startNewGame(roomName): void {
    const room = this.rooms[roomName];
    const lobby = this.roomsLobby[roomName];
    const { Game, ...props } = room;
    const players = lobby.map(({ user }) => Game.createPlayer(user));

    const game = new Game({ ...props, app: this, players });
    await game.init();
    this.roomsLobby[roomName] = [];
    await game.run();
  }
}

export class BaseGame extends Module {}

// ///// Gameplay

export class RockPaperScissorsGame extends BaseGame {
  name = 'RockPaperScissorsGame';
  config = {
    elements: 3,
  };

  private runScenario(): void {
    const [player1, player2] = this.players;
  }
  private run(): void {}
}

export class DiceGame extends BaseGame {
  config = {
    nominal: 6,
    count: 5,
  };
  currentStep = [1, 2, 3, 4, 5];
  players = [];
  playerStep = 2;

  public dropDices(): void {
    this.currentStep = map(range(this.dicesCount), () => random(1, this.dicesNominal));
  }
}

export class DiceMoreGame extends DiceGame {
  public getScore(): number {
    return sum(this.currentStep);
  }
}

/**
 * Rules: https://en.cardmates.net/dice_poker_rules
 */
export class DicePokerGame extends DiceGame {
  public getCombinationNames(): string[] {
    return ['fullHouse', 'pair'];
  }
  public getScore(): number {
    if (this.getCombinationNames()[0] === 'fullHouse') return 50;
    return 0;
  }
}

// ///////////////////

export class GameModule extends Module {
  findOrCreateGame(params) {
    const game = new DiceMoreGame({
      config: {
        nominal: 6,
        count: 3,
      },
    });

    return game;
  }
}

// //////////////// Players

export class Player {
  public runStep(): void {
    console.log('runStep');
  }
}

export class PechenPlayer extends Player {
  public priorityId: number;
  public conflictType: string | null = null;
  public userId = 0;
  public name = 'defaultName';
  public points = 0;
  private _character: Character;

  public attack: null | User['userId'] = null;
  public defence: null | User['userId'] = null;
  public characters: string[] = [];

  constructor(player: User, priorityId: number) {
    Object.assign(this, player);
    this.priorityId = priorityId;
  }

  public get character(): Character {
    return this._character;
  }

  public set character(character) {
    this._character = character;
  }

  public get characterName(): string {
    return this.character.name;
  }
}

export class BotPlayer extends Player {}

export interface User {
  userId: number;
  name: string;
}

export class GameRoom {
  private count: number;
  // private players: User[] = [];
  private players: User[] = [
    // {
    //   userId: 80081115,
    //   name: 'natavts',
    // },
    {
      userId: 2,
      name: 'p2',
    },
    {
      userId: 3,
      name: 'p3',
    },
    {
      userId: 80081115,
      name: 'natavts',
    },
  ];

  public game: Game;

  constructor(count: number) {
    this.count = count;
    if (this.isFull()) {
      this.startGame();
    }
  }
  public join(user: User): void {
    if (this.isFull()) return;
    this.players.push(user);
    if (this.isFull()) this.startGame();
  }

  public isFull(): boolean {
    return this.count === this.players.length;
  }

  public getUsers(userId: User['userId'] | undefined): string[] {
    let usersList = [];
    if (userId) {
      usersList = this.players.filter(user => user.userId !== userId);
      return usersList.map(user => user.name);
    }
    return this.players.map(user => user.name);
  }

  public getUserId(name: User['name']): User['userId'] | undefined {
    const user = find(this.players, { name });
    return user && user.userId;
  }

  public getUsersList(): string {
    const usersList = this.players.map((player, i) => `${i + 1}. @${player.name}`);
    return join(usersList, '\n');
  }

  public checkUserInGame(userId: User['userId']): boolean {
    return !!this.players.some(player => player.userId === userId);
  }

  private startGame(): void {
    if (this.game) return;
    this.game = new Game({ players: this.players });
    console.log('game', this.game);
    this.game.setTurns(mockEvents);
  }
}
// import { getStatus } from './utils';

export enum TurnType {
  attack = 'attack',
  defence = 'defence',
  character = 'character',
}

export interface Turn {
  type: TurnType;
  data: {
    userId: Player['userId'];
    opponentId?: Player['userId'];
    characterName?: string;
  };
  isConflicted?: boolean;
  round: number;
}

export interface UserStatus {
  username: Player['name'];
  points: number;
  characters: string[];
  attackPlayer: Player['name'];
  defencePlayer: Player['name'];
  opponentAttacks: Player['name'][];
  opponentDefences: Player['name'][];
}

export class Game {
  public round = 1;
  public turn = 1;

  public players: Player[] = [];
  public winners: Player[] = [];
  public events: Turn[] = [];
  public turns: Turn[] = [];
  public rules: Character[] = [];
  public conflictMode = false;
  public conflict = false;

  constructor({ players }: { players: User[] }) {
    this.players = players.map((p, i) => new Player(p, i));
    this.start();
  }

  public start(): void {
    this.initCharacters();
    this.events = [];
    this.turns = [];
  }

  private initCharacters(): void {
    this.initRules(this.players.length);
    this.players.forEach((player, i) => {
      player.character = this.rules[i];
    });
  }

  public initRules(count: number): void {
    const characters = persons.slice(0, count);
    this.rules = characters.map((person, i) => ({
      name: person,
      attack: characters[i + 1] || characters[0],
      defence: characters[i - 1] || characters[characters.length - 1],
    }));
  }

  public setTurns(events: Turn[]): void {
    events.forEach(event => {
      if (this.canDoAction(event.data.userId, event.type, event.data.characterName)) {
        this.makeTurn(event);
      }
    });
  }

  public getPlayer(userId: User['userId']): Player {
    return find(this.players, { userId }) as Player;
  }

  public getAvalibleCharactersForUser(userId: User['userId']): string[] {
    const currPlayer = this.getPlayer(userId);
    const playersList = this.players.filter(
      player =>
        player.character.name !== currPlayer.character.name && !currPlayer.characters.includes(player.character.name),
    );
    return playersList.map(player => player.character.name);
  }

  private isCanResolve(): boolean {
    return some(this.players, p => this.haveAnyTurns(p.userId));
  }

  public checkTurnEnd(): void {
    if (this.isAllTurns()) {
      console.log('isTurnEnd');
      // this.conflict = !every(this.players, { conflictType: null });
      this.conflictMode = !every(this.players, { conflictType: null });
      // if (this.conflict) {
      if (this.conflictMode) {
        console.log('!!!!conflictMode!!!!');
        if (this.isCanResolve()) {
          console.log('checkTurnEnd -> isCanResolve');
          // this.conflictMode = this.conflict;
          this.conflictMode = false;
          return;
        }
        console.log('!!! CANT RESOLVE!!!');
        this.players.forEach(p => {
          if (p.conflictType) {
            p[p.conflictType] = null;
          }
        });
      }
      // this.conflict = false;
      // this.conflictMode = this.conflict;
      this.conflictMode = false;
      console.log('!!! NEXT TURN !!!');

      this.events.push(...this.turns);
      this.turn += 1;
      this.turns = [];

      if (this.isRoundEnd()) {
        console.log('checkTurnEnd -> isRoundEnd');
        this.setPoints();
        this.round += 1;
        this.conflictMode = false;
        // this.conflict = false;
        this.players.forEach(p => {
          p.conflictType = null;
          p.attack = null;
          p.defence = null;
          p.characters = [];
          p.priorityId += 1;
          if (p.priorityId === this.players.length) {
            p.priorityId = 0;
          }
        });
        console.log({ players: this.players });
      }

      if (this.isGameOver()) {
        const { points } = maxBy(this.players, 'points') as Player;
        this.winners = this.players.filter(p => p.points === points);
      }
    }
  }

  public isGameOver(): boolean {
    return this.round > this.players.length;
  }

  private setPoints(): void {
    this.players.forEach(player => {
      const { character } = player;

      const victim = player.attack && this.getPlayer(player.attack).character.name;
      const attacking = player.defence && this.getPlayer(player.defence).character.name;

      if (victim && victim === character.attack) {
        player.points += 2;
      }

      if (attacking && attacking === character.defence) {
        player.points += 1;
      }
    });
  }

  public canDoAction(userId: User['userId'], action: TurnType, characterName?: string): boolean {
    const player = this.getPlayer(userId);
    if (this.conflictMode) {
      console.log('canDoAction -> this.conflictMode', this.conflictMode);
      return !!player.conflictType && action === player.conflictType;
    }
    if (find(this.turns, { userId })) {
      return false;
    }
    if (action === TurnType.character && characterName) {
      return !player.characters.includes(characterName);
    }
    return this.haveTurns(userId, action);
  }

  private getConflictTurnType(type: TurnType): TurnType {
    return type === TurnType.attack ? TurnType.defence : TurnType.attack;
  }

  private checkConflict({ type, data }: Turn): void {
    const player = this.getPlayer(data.userId);
    const opponent = this.getPlayer(data.opponentId);

    const conflictAction = this.getConflictTurnType(type);

    if (opponent[conflictAction] === player.userId) {
      const { conflictPlayer, conflictTurnType } =
        player.priorityId < opponent.priorityId
          ? { conflictPlayer: opponent, conflictTurnType: conflictAction }
          : { conflictPlayer: player, conflictTurnType: type };

      conflictPlayer.conflictType = conflictTurnType;
      const conflictedTurn = find(this.turns, {
        data: { userId: conflictPlayer.userId, opponentId: conflictPlayer[conflictTurnType] },
      }) as Turn;
      conflictedTurn.isConflicted = true;
    }
  }

  public makeTurn(turnData: Omit<Turn, 'round'>): void {
    const turn = { ...turnData, round: this.round };
    const { type, data } = turn;
    this.turns.push(turn);

    const player = this.getPlayer(data.userId);

    if (type !== TurnType.character) {
      player[type] = data.opponentId;

      if (this.conflictMode) {
        player.conflictType = null;
      }

      this.checkConflict(turn);
    } else {
      player.characters.push(data.characterName as string);
    }

    this.checkTurnEnd();
  }

  public getAvalibleCharacters(userId: number): string[] {
    const all = this.getAvalibleCharactersForUser(userId);
    const except = this.getPlayer(userId)?.characters;
    return pullAll(all, except);
  }

  public getActionForUser(userId: number, type: TurnType): any[] {
    const player = this.getPlayer(userId);
    if (type === TurnType.character) {
      return this.getAvalibleCharactersForUser(userId);
    }
    const opponents = this.getOpponentActionEventsList(userId, this.getConflictTurnType(type), this.events).map(
      event => event.data.userId,
    );
    // if (this.conflict && player?.conflictType === type) {
    if (this.conflictMode && player?.conflictType === type) {
      const conflictOpponents = this.getOpponentActionEventsList(userId, this.getConflictTurnType(type), [
        ...this.events,
        ...this.turns,
      ]).map(event => event.data.userId);
      console.log(
        'getActionForUser conflictMode',
        userId,
        type,
        conflictOpponents,
        this.players.filter(
          p => p.userId !== player?.userId && p.userId !== player[type] && !conflictOpponents.includes(p.userId),
        ),
      );
      return this.players.filter(
        p => p.userId !== player?.userId && p.userId !== player[type] && !conflictOpponents.includes(p.userId),
      );
    }
    // console.log('opponents', userId, this.getConflictTurnType(type), opponents);
    return player?.[type] ? [] : this.players.filter(p => p.userId !== player?.userId && !opponents.includes(p.userId));
  }

  public haveTurns(userId: number, type: TurnType): boolean {
    return !!this.getActionForUser(userId, type).length;
  }

  public haveAnyTurns(userId: number): boolean {
    console.log(
      'haveAnyTurnshaveAnyTurnshaveAnyTurnshaveAnyTurns',
      persons.filter(c => this.canDoAction(userId, TurnType.character, c)),
    );
    return (
      this.canDoAction(userId, TurnType.attack) ||
      this.canDoAction(userId, TurnType.defence) ||
      !!persons.filter(c => this.canDoAction(userId, TurnType.character, c)).length
    );
  }

  private isAllTurns(): boolean {
    return this.turns.length >= this.players.length || this.isRoundEnd();
  }

  public isRoundEnd(): boolean {
    const canAttack = this.players.map(p => this.haveTurns(p.userId, TurnType.attack)).includes(true);
    // console.log(
    //   'isRoundEnd -> canAttack',
    //   canAttack,
    //   this.players.map(p => this.haveTurns(p.userId, TurnType.attack)),
    // );
    const canDefence = this.players.map(p => this.haveTurns(p.userId, TurnType.defence)).includes(true);
    console.log('isRoundEnd -> canDefence', canDefence);

    return !canAttack && !canDefence;
  }

  private getOpponentActionEventsList(
    userId: User['userId'],
    type: TurnType.attack | TurnType.defence,
    events: Turn[],
  ): Turn[] {
    return events.filter(
      event =>
        event.round === this.round &&
        !event.isConflicted &&
        event.type === TurnType[type] &&
        (event.data as Turn['data']).opponentId === userId,
    );
  }
  private getOpponentActionList(
    userId: User['userId'],
    type: TurnType.attack | TurnType.defence,
    events: Turn[],
  ): Player['name'][] {
    const opponentActions = this.getOpponentActionEventsList(userId, type, events);
    return opponentActions.map(item => `@${this.getPlayer(item.data.userId)?.name}` || '').filter(i => !!i);
  }

  public getStatusData(): UserStatus[] {
    const data = this.players.map(player => {
      const attackEvent = find(
        this.events.filter(e => !e.isConflicted),
        { type: TurnType.attack, data: { userId: player.userId } },
      );
      const defenceEvent = find(
        this.events.filter(e => !e.isConflicted),
        { type: TurnType.defence, data: { userId: player.userId } },
      );

      console.log(player.characters);

      return {
        username: player.name,
        points: player.points,
        characters: player.characters,
        attackPlayer: (attackEvent && this.getPlayer(attackEvent.data.opponentId)?.name) || '',
        defencePlayer: (defenceEvent && this.getPlayer(defenceEvent.data.opponentId)?.name) || '',
        opponentAttacks: this.getOpponentActionList(player.userId, TurnType.attack, this.events),
        opponentDefences: this.getOpponentActionList(player.userId, TurnType.defence, this.events),
      };
    });
    return data;
  }
}

// const game = new Game({ players: mockPlayers });
// game.setTurns(mockEvents);

// console.log('========================================');
// console.log('========================================');
// console.log('========================================');
// console.log(game.turns);
// console.log(game.getStatusData());
// // game.attack({ userId: 0, opponentId: 1 });
// // console.log(game.canDoAction(0, TurnType.attack));
// // console.log(getStatus(game.getStatusData()));
// // game.attack({ userId: 1, opponentId: 2 });
// // // game.attack({ userId: 2, opponentId: 1 });
// // game.defence({ userId: 0, opponentId: 2 });
// // game.defence({ userId: 1, opponentId: 2 });
// // // game.defence({ userId: 2, opponentId: 0 });
// // console.log(game.turns);

// console.log('========================================');
// console.log('========================================');
// console.log('========================================');
