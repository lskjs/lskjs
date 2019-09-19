import { spawn } from 'child_process';
import Event from 'events';

function launch(arr = []) {
  if (!arr.length) {
    console.error('RegExp\'s not specified');
    return;
  }
  const pattern = arr.map((i, idx) => `${i.source}${idx < arr.length - 1 ? '|' : ''}`).join('');
  const rx = new RegExp(pattern);
  const event = new Event();
  const { argv, stdout } = process;
  const keys = {};

  argv.forEach((item, index) => {
    const prev = argv[index - 1];
    if (prev && prev.startsWith('--')) {
      if (!keys[prev]) {
        keys[prev] = [item];
      } else {
        keys[prev].push(item);
      }
    }
  });

  const scripts = Object.values(keys);
  const checks = scripts.map(s => s.map(() => false));

  function isTurnCompleted(turnIndex) {
    const turn = checks[turnIndex];
    const isAll = turn.every(e => e === true) && turn.length === scripts[turnIndex].length;
    return isAll;
  }

  function startTurn(turn, turnIndex) {
    turn.forEach((cmd, index) => {
      const [command, ...params] = cmd.split(' ');
      console.log(`═══ Launcher start turn ${turnIndex + 1}: ${params[1]} ═══`);
      const pr = spawn(command, params);
      pr.stdout.on('data', (data) => {
        stdout.write(`${params[1]}: ${data}`);
        if (!isTurnCompleted(turnIndex) && rx.test(data)) {
          checks[turnIndex][index] = true;
          event.emit('event', turnIndex);
        }
      });
      const isPrefix = false;
      const prefix = isPrefix ? `${params[1]}: ` : '';

      pr.stderr.on('data', (data) => {
        console.error(`${prefix}${data}`);
      });

      pr.on('close', (code) => {
        const text = `${prefix}process exited with code ${code}`;
        if (code) {
          console.error(text);
        } else {
          console.log(text);
        }
      });
    });
  }

  if (scripts.length) {
    startTurn(scripts[0], 0);
  } else {
    console.error('Arguments not specified');
    return;
  }

  event.on('event', (turnIndex) => {
    if (isTurnCompleted(turnIndex)) {
      if (turnIndex === scripts.length - 1) return;
      startTurn(scripts[turnIndex + 1], turnIndex + 1);
    }
  });
}

export default launch;
