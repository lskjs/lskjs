export default class Buttons extends Component {
  render() {
    return (
      <section className="guideline__section">
        <h3>Кнопки</h3>
        {ACTIONS.map(action => (
          SIZES.map((size, i) => (
            <div key={i}>
              {BUTTONS.map((title, i) => (
                <Button
                  key={i}
                  bsSize={size}
                  bsStyle={title.toLowerCase()}
                  {...action}
                >
                  {title}
                </Button>
              ))}
            </div>
          ))
        ))}
        <h3>Группы кнопок</h3>
        <div>
          <ButtonGroup>
            <Button>Left</Button>
            <Button>Middle</Button>
            <Button>Right</Button>
          </ButtonGroup>
        </div>
        <div>
          <ButtonGroup>
            <Button bsStyle="primary">Left</Button>
            <Button bsStyle="warning">Middle</Button>
            <Button bsStyle="danger">Right</Button>
          </ButtonGroup>
        </div>
        <div>
          <ButtonGroup vertical>
            <Button>Left</Button>
            <Button>Middle</Button>
            <Button>Right</Button>
          </ButtonGroup>
        </div>
        <div>
          <ButtonGroup vertical>
            <Button bsStyle="primary">Left</Button>
            <Button bsStyle="warning">Middle</Button>
            <Button bsStyle="danger">Right</Button>
          </ButtonGroup>
        </div>
        <h3>Тулбар кнопок</h3>
        <div>
          <ButtonToolbar>
            <ButtonGroup>
              <Button>1</Button>
              <Button>2</Button>
              <Button>3</Button>
              <Button>4</Button>
            </ButtonGroup>

            <ButtonGroup>
              <Button>5</Button>
              <Button>6</Button>
              <Button>7</Button>
            </ButtonGroup>

            <ButtonGroup>
              <Button>8</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
      </section>
    );
  }
}
