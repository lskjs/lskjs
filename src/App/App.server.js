import ReactApp from 'lego-starter-kit/ReactApp'; // eslint-disable-line
import _ from 'lodash';
import getApi from './api';
import getDocs from './api/api.docs';
import routes from './routes';
import assets from './assets'; // eslint-disable-line


function castTask(task) {
  if (!task.answers) return task;

  const values = _.shuffle(_.range(task.answers.length));

  return {
    ...task.toObject(),
    answersView: undefined,
    answers: undefined,
    checker: {
      type: 'match',
      value: values[0],
    },
    decision: {
      type: 'button',
      view: '2column',
      options: _.shuffle(task.answers.map((answer, index) => {
        const res = {
          value: values[index],
          title: answer.title,
        };
        if (answer.text) {
          res.text = answer.text;
        }
        return res;
      })),
    },
  };
}

export default class App extends ReactApp {

  getModels() {
    return {
      ...super.getModels(),
      ...require('./models').default(this), // eslint-disable-line
    };
  }

  useRoutes() {
    this.app.enable('trust proxy');
    this.app.all('/api', (req, res) => res.json({ message: 'Current API version is here: /api/v1', url: '/api/v1' }));
    this.app.use('/api/v1', this.getDocsRouter(getDocs, {
      v: 1,
      path: '/api/v1',
    }));
    this.app.use('/api/v1', getApi(this));

    this.app.get('/game/create', async (req, res) => {
      const { categoryId } = req.query;
      const { Task, Game } = this.models;
      let tasks = await Task.find({ categoryId });
      tasks = _.sampleSize(tasks, 7);
      tasks = tasks.map(castTask);
      // tasks.de = _.shuffle(tasks.answers)

      // return res.json({tasks})
      const game = new Game({ tasks, categoryId });
      await game.save();
      return res.redirect(`/game/${game.id}`);
    });
    this.app.post('/game/answer', async (req, res) => {
      const { id } = req.query;
      const { Game } = this.models;
      const game = await Game.findById(id);
      game.answers = req.body.answers;
      const result = {
        count: game.tasks.length,
        correct: 0,
      };

      game.answers.map((answer, index) => {
        result.correct += game.tasks[index].checker.value === answer;
      });
      result.score = result.correct / result.count;
      game.result = result;
      game.finishedAt = new Date();
      await game.save();
      return res.json(game);
      // return res.redirect(`/game/${game.id}`);
    });
    this.app.post('/game/cert', async (req, res) => {
      const { id } = req.query;
      const { Game } = this.models;
      const game = await Game.findById(id);
      game.cert = req.body.cert;
      await game.save();
      return res.json(game);
    });
    this.app.get('/game/buy', async (req, res) => {
      const { id } = req.query;
      const { Game } = this.models;
      const game = await Game.findById(id);
      game.boughtAt = new Date();
      await game.save();
      return res.redirect(`/game/${game.id}`);
    });
  }

  getStatics() {
    return {
      ...super.getStatics(),
      ...{
        '/': `${__dirname}/../src/public`,
      },
    };
  }


  getAssets() {
    return assets.main;
  }

  static Html = require('./Html').default; // eslint-disable-line
  Provider = require('./stores/AppStore').default; // eslint-disable-line

  getUniversalRoutes() {
    return routes;
  }

}
