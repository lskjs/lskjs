import React, { Component } from 'react';
import css from 'importcss';
import {
  Row,
  Col,
  Card,
  CardBlock,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  CardLink,
  CardHeader,
  CardFooter,
  CardImgOverlay,
  Button,
  Tab,
  Nav,
  NavItem,
  ButtonGroup,
  ButtonToolbar,
  DropdownButton,
  MenuItem,
  SplitButton,
  Modal,
  OverlayTrigger,
  Tooltip,
  Popover,
  NavDropdown,
  Navbar,
  FormGroup,
  FormControl,
  Pagination,
  Pager,
  Jumbotron,
  PageHeader,
  ListGroup,
  ListGroupItem,
  Table,
  Panel,
  PanelGroup,
  Accordion,
  Well,
  Checkbox,
  Radio,
  ControlLabel,
  Form,
  InputGroup,
  HelpBlock,
} from 'react-bootstrap';

require('./Guildelines.g.css');

const BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger'];
const ACTIONS = [{}, { active: true }, { disabled: true }];
const SIZES = ['lg', null, 'sm', 'xs'];

@css(require('./Guidelines.css'))
export default class Guidelines extends Component {
  render() {
    return (
      <Row>
        <Col xs={12}>
          <Card style={{ marginTop: 20 }}>
            <CardBlock>
              <Tab.Container id="left-tabs" defaultActiveKey="buttons">
                <Row className="clearfix">
                  <Col sm={3}>
                    <Menus />
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="buttons">
                        <Buttons />
                      </Tab.Pane>
                      <Tab.Pane eventKey="dropdowns">
                        <Dropdowns />
                      </Tab.Pane>
                      <Tab.Pane eventKey="modals">
                        <Modals />
                      </Tab.Pane>
                      <Tab.Pane eventKey="tooltips">
                        <Tooltips />
                      </Tab.Pane>
                      <Tab.Pane eventKey="popovers">
                        <Popovers />
                      </Tab.Pane>
                      <Tab.Pane eventKey="navs">
                        <Navs />
                      </Tab.Pane>
                      <Tab.Pane eventKey="navbars">
                        <Navbars />
                      </Tab.Pane>
                      <Tab.Pane eventKey="paginations">
                        <Paginations />
                      </Tab.Pane>
                      <Tab.Pane eventKey="pageLayout">
                        <PageLayout />
                      </Tab.Pane>
                      <Tab.Pane eventKey="tables">
                        <Tables />
                      </Tab.Pane>
                      <Tab.Pane eventKey="panels">
                        <Panels />
                      </Tab.Pane>
                      <Tab.Pane eventKey="wells">
                        <Wells />
                      </Tab.Pane>
                      <Tab.Pane eventKey="forms">
                        <FormsPage />
                      </Tab.Pane>
                      <Tab.Pane eventKey="cards">
                        <Cards />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </CardBlock>
          </Card>
        </Col>
      </Row>
    );
  }
}
@css(require('./Guidelines.css'))
class Menus extends Component {
  render() {
    return (
      <Nav bsStyle="pills" stacked>
        <NavItem eventKey="buttons">
          Кнопки
        </NavItem>
        <NavItem eventKey="dropdowns">
          Выпадающие списки
        </NavItem>
        <NavItem eventKey="modals">
          Модалки
        </NavItem>
        <NavItem eventKey="tooltips">
          Всплывающие подсказки
        </NavItem>
        <NavItem eventKey="popovers">
          Всплывающие окна
        </NavItem>
        <NavItem eventKey="navs">
          Навигация
        </NavItem>
        <NavItem eventKey="navbars">
          Навигационный бар
        </NavItem>
        <NavItem eventKey="paginations">
        Пагинация
        </NavItem>
        <NavItem eventKey="pageLayout">
        Элементы страницы
        </NavItem>
        <NavItem eventKey="tables">
        Таблицы
        </NavItem>
        <NavItem eventKey="panels">
        Панели
        </NavItem>
        <NavItem eventKey="wells">
        Колодцы
        </NavItem>
        <NavItem eventKey="forms">
        Формы
        </NavItem>
        <NavItem eventKey="cards">
        Карточки
        </NavItem>
      </Nav>
    );
  }
}
@css(require('./Guidelines.css'))
class Cards extends Component {
  render() {
    return (
      <section className="card-static">
        <h3>Карточка</h3>
        <div>
          <Card>
            <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardBlock>
              <CardTitle>Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
              <Button>Button</Button>
            </CardBlock>
          </Card>
        </div>
        <h3>Карточка с изображением внутри контента</h3>
        <div>
          <Card>
            <CardBlock>
              <CardTitle>Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
            </CardBlock>
            <img width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
            <CardBlock>
              <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
              <CardLink href="#">Card Link</CardLink>
              <CardLink href="#">Another Link</CardLink>
            </CardBlock>
          </Card>
        </div>
        <h3>Карточка с заголовком и подвалом</h3>
        <div>
          <Card>
            <CardHeader>Header</CardHeader>
            <CardBlock>
              <CardTitle>Special Title Treatment</CardTitle>
              <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
              <Button>Go somewhere</Button>
            </CardBlock>
            <CardFooter>Footer</CardFooter>
          </Card>
        </div>
        <h3>Карточка с оверлеем</h3>
        <div>
          <Card inverse>
            <CardImg width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97270&w=318&h=270&bg=333333&txtclr=666666" alt="Card image cap" />
            <CardImgOverlay>
              <CardTitle>Card Title</CardTitle>
              <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
              <CardText>
                <small className="text-muted">Last updated 3 mins ago</small>
              </CardText>
            </CardImgOverlay>
          </Card>
        </div>
        <h3>Карточки разноцветные</h3>
        <div>
          <Card block inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <Button>Button</Button>
          </Card>
          <Card block inverse color="primary">
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <Button color="secondary">Button</Button>
          </Card>
          <Card block inverse color="success">
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <Button color="secondary">Button</Button>
          </Card>
          <Card block inverse color="info">
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <Button color="secondary">Button</Button>
          </Card>
          <Card block inverse color="warning">
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <Button color="secondary">Button</Button>
          </Card>
          <Card block inverse color="danger">
            <CardTitle>Special Title Treatment</CardTitle>
            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
            <Button color="secondary">Button</Button>
          </Card>
        </div>
      </section>
    );
  }
}

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
@css(require('./Guidelines.css'))
class FormsPage extends Component {
  render() {
    return (
      <section>
        <h3>Формы</h3>
        <div>
          <form>
            <FieldGroup
              id="formControlsText"
              type="text"
              label="Text"
              placeholder="Enter text"
            />
            <FieldGroup
              id="formControlsEmail"
              type="email"
              label="Email address"
              placeholder="Enter email"
            />
            <FieldGroup
              id="formControlsPassword"
              label="Password"
              type="password"
            />
            <FieldGroup
              id="formControlsFile"
              type="file"
              label="File"
              help="Example block-level help text here."
            />

            <Checkbox checked readOnly>
              Checkbox
            </Checkbox>
            <Radio checked readOnly>
              Radio
            </Radio>

            <FormGroup>
              <Checkbox inline>
                1
              </Checkbox>
              {' '}
              <Checkbox inline>
                2
              </Checkbox>
              {' '}
              <Checkbox inline>
                3
              </Checkbox>
            </FormGroup>
            <FormGroup>
              <Radio name="radioGroup" inline>
                1
              </Radio>
              {' '}
              <Radio name="radioGroup" inline>
                2
              </Radio>
              {' '}
              <Radio name="radioGroup" inline>
                3
              </Radio>
            </FormGroup>

            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select</ControlLabel>
              <FormControl componentClass="select" placeholder="select">
                <option value="select">select</option>
                <option value="other">...</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formControlsSelectMultiple">
              <ControlLabel>Multiple select</ControlLabel>
              <FormControl componentClass="select" multiple>
                <option value="select">select (multiple)</option>
                <option value="other">...</option>
              </FormControl>
            </FormGroup>

            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Textarea</ControlLabel>
              <FormControl componentClass="textarea" placeholder="textarea" />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Static text</ControlLabel>
              <FormControl.Static>
                email@example.com
              </FormControl.Static>
            </FormGroup>

            <Button type="submit">
              Submit
            </Button>
          </form>
        </div>
        <h3>Форма в линию</h3>
        <div>
          <Form inline>
            <FormGroup controlId="formInlineName">
              <ControlLabel>Name</ControlLabel>
              {' '}
              <FormControl type="text" placeholder="Jane Doe" />
            </FormGroup>
            {' '}
            <FormGroup controlId="formInlineEmail">
              <ControlLabel>Email</ControlLabel>
              {' '}
              <FormControl type="email" placeholder="jane.doe@example.com" />
            </FormGroup>
            {' '}
            <Button type="submit">
              Send invitation
            </Button>
          </Form>
        </div>
        <h3>Горизонтальная форма</h3>
        <div>
          <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={10}>
                <FormControl type="email" placeholder="Email" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl type="password" placeholder="Password" />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Checkbox>Remember me</Checkbox>
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={2} sm={10}>
                <Button type="submit">
                  Sign in
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
        <h3>Размеры полей для ввода</h3>
        <div>
          <form>
            <FormGroup bsSize="large">
              <FormControl type="text" placeholder="Large text" />
            </FormGroup>
            <FormGroup>
              <FormControl type="text" placeholder="Normal text" />
            </FormGroup>
            <FormGroup bsSize="small">
              <FormControl type="text" placeholder="Small text" />
            </FormGroup>
          </form>
        </div>
        <h3>Группированные поля для ввода</h3>
        <div>
          <form>
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon>@</InputGroup.Addon>
                <FormControl type="text" />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <FormControl type="text" />
                <InputGroup.Addon>.00</InputGroup.Addon>
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon>$</InputGroup.Addon>
                <FormControl type="text" />
                <InputGroup.Addon>.00</InputGroup.Addon>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <FormControl type="text" />
                <InputGroup.Addon>
                  Music
                </InputGroup.Addon>
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <InputGroup.Button>
                  <Button>Before</Button>
                </InputGroup.Button>
                <FormControl type="text" />
              </InputGroup>
            </FormGroup>

            <FormGroup>
              <InputGroup>
                <InputGroup.Addon>
                  <input type="radio" aria-label="..." />
                </InputGroup.Addon>
                <FormControl type="text" />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroup.Addon>
                  <input type="checkbox" aria-label="..." />
                </InputGroup.Addon>
                <FormControl type="text" />
              </InputGroup>
            </FormGroup>
          </form>
        </div>
        <h3>Валидация форм</h3>
        <div>
          <form>
            <FormGroup controlId="formValidationSuccess1" validationState="success">
              <ControlLabel>Input with success</ControlLabel>
              <FormControl type="text" />
              <HelpBlock>Help text with validation state.</HelpBlock>
            </FormGroup>

            <FormGroup controlId="formValidationWarning1" validationState="warning">
              <ControlLabel>Input with warning</ControlLabel>
              <FormControl type="text" />
            </FormGroup>

            <FormGroup controlId="formValidationError1" validationState="error">
              <ControlLabel>Input with error</ControlLabel>
              <FormControl type="text" />
            </FormGroup>

            <FormGroup controlId="formValidationNull" validationState={null}>
              <ControlLabel>Input with no validation state</ControlLabel>
              <FormControl type="text" />
            </FormGroup>

            <FormGroup controlId="formValidationSuccess2" validationState="success">
              <ControlLabel>Input with success and feedback icon</ControlLabel>
              <FormControl type="text" />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup controlId="formValidationWarning2" validationState="warning">
              <ControlLabel>Input with warning and feedback icon</ControlLabel>
              <FormControl type="text" />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup controlId="formValidationError2" validationState="error">
              <ControlLabel>Input with error and feedback icon</ControlLabel>
              <FormControl type="text" />
              <FormControl.Feedback />
            </FormGroup>

            <FormGroup controlId="formValidationWarning3" validationState="warning">
              <ControlLabel>Input group with warning</ControlLabel>
              <InputGroup>
                <InputGroup.Addon>@</InputGroup.Addon>
                <FormControl type="text" />
              </InputGroup>
              <FormControl.Feedback />
            </FormGroup>

            <Form componentClass="fieldset" horizontal>
              <FormGroup controlId="formValidationError3" validationState="error">
                <Col componentClass={ControlLabel} xs={3}>
                  Input with error
                </Col>
                <Col xs={9}>
                  <FormControl type="text" />
                  <FormControl.Feedback />
                </Col>
              </FormGroup>

              <FormGroup controlId="formValidationSuccess4" validationState="success">
                <Col componentClass={ControlLabel} xs={3}>
                  Input group with success
                </Col>
                <Col xs={9}>
                  <InputGroup>
                    <InputGroup.Addon>@</InputGroup.Addon>
                    <FormControl type="text" />
                  </InputGroup>
                  <FormControl.Feedback />
                </Col>
              </FormGroup>
            </Form>

            <Form componentClass="fieldset" inline>
              <FormGroup controlId="formValidationWarning4" validationState="warning">
                <ControlLabel>Input with warning</ControlLabel>
                {' '}
                <FormControl type="text" />
                <FormControl.Feedback />
              </FormGroup>
              {' '}
              <FormGroup controlId="formValidationError4" validationState="error">
                <ControlLabel>Input group with error</ControlLabel>
                {' '}
                <InputGroup>
                  <InputGroup.Addon>@</InputGroup.Addon>
                  <FormControl type="text" />
                </InputGroup>
                <FormControl.Feedback />
              </FormGroup>
            </Form>

            <Checkbox validationState="success">
              Checkbox with success
            </Checkbox>
            <Radio validationState="warning">
              Radio with warning
            </Radio>
            <Checkbox validationState="error">
              Checkbox with error
            </Checkbox>

            <FormGroup validationState="success">
              <Checkbox inline>
                Checkbox
              </Checkbox>
              {' '}
              <Checkbox inline>
                with
              </Checkbox>
              {' '}
              <Checkbox inline>
                success
              </Checkbox>
            </FormGroup>
          </form>
        </div>
      </section>
    );
  }
}
@css(require('./Guidelines.css'))
class Wells extends Component {
  render() {
    return (
      <section>
        <h3>Колодцы</h3>
        <div>
          <Well>Look I'm in a well!</Well>
        </div>
        <div>
          <Well bsSize="large">Look I'm in a large well!</Well>
        </div>
        <div>
          <Well bsSize="small">Look I'm in a small well!</Well>
        </div>
      </section>
    );
  }
}
@css(require('./Guidelines.css'))
class Panels extends Component {
  render() {
    return (
      <section>
        <h3>Панель</h3>
        <div>
          <Panel onClick={() => alert('Мемы')}>
            Basic panel example
          </Panel>
        </div>
        <h3>Панель с заголовком</h3>
        <div>
          <Panel header="Panel heading without title">
            Panel content
          </Panel>
        </div>
        <div>
          <Panel header={<h3>H3 Title</h3>}>
            Panel content
          </Panel>
        </div>
        <h3>Панель с подвалом</h3>
        <div>
          <Panel footer="Panel footer">
            Panel content
          </Panel>
        </div>
        <h3>Панель с разным стилем</h3>
        {BUTTONS.map((title, i) => (
          <div key={i}>
            <Panel header={title} bsStyle={title.toLowerCase()}>
              Panel content
            </Panel>
          </div>
        ))}
        <h3>Панель с групированным списком</h3>
        <div>
          <Panel collapsible defaultExpanded header="Panel heading">
            Some default panel content here.
            <ListGroup fill>
              <ListGroupItem>Item 1</ListGroupItem>
              <ListGroupItem>Item 2</ListGroupItem>
              <ListGroupItem>&hellip;</ListGroupItem>
            </ListGroup>
            Some more panel content here.
          </Panel>
        </div>
        <h3>Группированные панели</h3>
        <div>
          <PanelGroup defaultActiveKey="2">
            <Panel header="Panel 1" eventKey="1">Panel 1 content</Panel>
            <Panel header="Panel 2" eventKey="2">Panel 2 content</Panel>
          </PanelGroup>
        </div>
        <h3>Аккордеон</h3>
        <div>
          <Accordion>
            <Panel header="Collapsible Group Item #1" eventKey="1">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </Panel>
            <Panel header="Collapsible Group Item #2" eventKey="2">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </Panel>
            <Panel header="Collapsible Group Item #3" eventKey="3">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </Panel>
          </Accordion>
        </div>
      </section>
    );
  }
}
@css(require('./Guidelines.css'))
class Tables extends Component {
  render() {
    return (
      <section>
        <h3>Таблица</h3>
        <div>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <h3>Резиновая таблица</h3>
        <div>
          <Table responsive>
            <thead>
            <tr>
              <th>#</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
              <th>Table heading</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>1</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
            </tr>
            </tbody>
          </Table>
        </div>
      </section>
    );
  }
}
@css(require('./Guidelines.css'))
class PageLayout extends Component {
  render() {
    return (
      <section>
        <h3>Джамботрон</h3>
        <div>
          <Jumbotron>
            <h1>Hello, world!</h1>
            <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <p><Button bsStyle="primary">Learn more</Button></p>
          </Jumbotron>
        </div>
        <h3>Заголовок страницы</h3>
        <div>
          <PageHeader>Example page header <small>Subtext for header</small></PageHeader>
        </div>
        <h3>Группированный список</h3>
        <div>
          <ListGroup>
            <ListGroupItem>Item 1</ListGroupItem>
            <ListGroupItem>Item 2</ListGroupItem>
            <ListGroupItem href="#" active>Active Link 1</ListGroupItem>
            <ListGroupItem href="#">Link 3</ListGroupItem>
            <ListGroupItem onClick={() => alert('clicked')}>
              Trigger an alert
            </ListGroupItem>
            <ListGroupItem href="#" disabled>Link 3</ListGroupItem>
            <ListGroupItem bsStyle="success">Success</ListGroupItem>
            <ListGroupItem bsStyle="info">Info</ListGroupItem>
            <ListGroupItem bsStyle="warning">Warning</ListGroupItem>
            <ListGroupItem bsStyle="danger">Danger</ListGroupItem>
            <ListGroupItem>...</ListGroupItem>
          </ListGroup>
        </div>
        <h3>Групированный список с заголовком</h3>
        <div>
          <ListGroup>
            <ListGroupItem header="Heading">Item 1</ListGroupItem>
            <ListGroupItem header="Heading">Item 2</ListGroupItem>
            <ListGroupItem header="Heading" href="#" active>Active Link 1</ListGroupItem>
            <ListGroupItem header="Heading" href="#">Link 3</ListGroupItem>
            <ListGroupItem header="Heading" onClick={() => alert('clicked')}>
              Trigger an alert
            </ListGroupItem>
            <ListGroupItem header="Heading" href="#" disabled>Link 3</ListGroupItem>
            <ListGroupItem header="Heading" bsStyle="success">Success</ListGroupItem>
            <ListGroupItem header="Heading" bsStyle="info">Info</ListGroupItem>
            <ListGroupItem header="Heading" bsStyle="warning">Warning</ListGroupItem>
            <ListGroupItem header="Heading" bsStyle="danger">Danger</ListGroupItem>
            <ListGroupItem header="Heading">...</ListGroupItem>
          </ListGroup>
        </div>
      </section>
    );
  }
}
@css(require('./Guidelines.css'))
class Paginations extends Component {
  render() {
     return (
      <section>
        <h3>Пагинация</h3>
        <div>
          <PaginationBasic />
        </div>
        <h3>Пагинаторы</h3>
        <div>
          <Pager>
            <Pager.Item href="#">Previous</Pager.Item>
            {' '}
            <Pager.Item href="#">Next</Pager.Item>
          </Pager>
        </div>
        <h3>Пагинаторы с направлением</h3>
        <div>
          <Pager>
            <Pager.Item previous href="#">&larr; Previous Page</Pager.Item>
            <Pager.Item next href="#">Next Page &rarr;</Pager.Item>
          </Pager>
        </div>
        <h3>Выключенный пагинатор</h3>
        <div>
          <Pager>
            <Pager.Item previous href="#">&larr; Previous</Pager.Item>
            <Pager.Item disabled next href="#">Next &rarr;</Pager.Item>
          </Pager>
        </div>
      </section>
    );
  }
}
@css(require('./Guidelines.css'))
class PaginationBasic extends Component {
  constructor() {
    super();
    this.state = {
      activePage: 1,
    };
  }

  handleSelect = (eventKey) => {
    this.setState({
      activePage: eventKey,
    });
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Pagination
          bsSize="large"
          items={10}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
        />
        <Pagination
          bsSize="medium"
          items={10}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
        />
        <Pagination
          bsSize="small"
          items={10}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
        />
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={20}
          maxButtons={5}
          activePage={this.state.activePage}
          onSelect={this.handleSelect}
        />
      </div>
    );
  }
}
@css(require('./Guidelines.css'))
class Navbars extends Component {
  render() {
    return (
      <section>
        <h3>Навигационный бар</h3>
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">React-Bootstrap</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem eventKey={1} href="#">Link</NavItem>
              <NavItem eventKey={2} href="#">Link</NavItem>
              <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Action</MenuItem>
                <MenuItem eventKey={3.2}>Another action</MenuItem>
                <MenuItem eventKey={3.3}>Something else here</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={3.4}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar>
        </div>
        <h3>Резиновый навигационный бар</h3>
        <div>
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">React-Bootstrap</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#">Link</NavItem>
                <NavItem eventKey={2} href="#">Link</NavItem>
                <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1}>Action</MenuItem>
                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">Link Right</NavItem>
                <NavItem eventKey={2} href="#">Link Right</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <h3>Навигационный бар со строкой поиска</h3>
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">Brand</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Navbar.Form pullLeft>
                <FormGroup>
                  <FormControl type="text" placeholder="Search" />
                </FormGroup>
                {' '}
                <Button type="submit">Submit</Button>
              </Navbar.Form>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <h3>Навигационный бар с текстом и текстовыми ссылками</h3>
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">Brand</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Navbar.Text>
                Signed in as: <Navbar.Link href="#">Mark Otto</Navbar.Link>
              </Navbar.Text>
              <Navbar.Text pullRight>
                Have a great day!
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </section>
    );
  }
}
@css(require('./Guidelines.css'))
class Navs extends Component {
  render() {
    return (
      <section>
        <h3>Навигация (кнопки)</h3>
        <div>
          <Nav bsStyle="pills" activeKey={1} onSelect={(e) => alert(`selected ${e}`)}>
            <NavItem eventKey={1}>NavItem 1 content</NavItem>
            <NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
            <NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
          </Nav>
        </div>
        <h3>Навигация (табы) с выпадающем списком</h3>
        <div>
          <Nav bsStyle="tabs" activeKey="1">
            <NavItem eventKey="1">NavItem 1 content</NavItem>
            <NavItem eventKey="2" title="Item">NavItem 2 content</NavItem>
            <NavItem eventKey="3" disabled>NavItem 3 content</NavItem>
            <NavDropdown eventKey="4" title="Dropdown" id="nav-dropdown">
              <MenuItem eventKey="4.1">Action</MenuItem>
              <MenuItem eventKey="4.2">Another action</MenuItem>
              <MenuItem eventKey="4.3">Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4.4">Separated link</MenuItem>
            </NavDropdown>
          </Nav>
        </div>
        <h3>Вертикальная навигация</h3>
        <div>
          <Nav bsStyle="pills" stacked activeKey={1} onSelect={(e) => alert(`selected ${e}`)}>
            <NavItem eventKey={1}>NavItem 1 content</NavItem>
            <NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
            <NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
          </Nav>
        </div>
        <h3>На всю ширину</h3>
        <div>
          <Nav bsStyle="tabs" justified activeKey={1}>
            <NavItem eventKey={1}>NavItem 1 content</NavItem>
            <NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
            <NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
          </Nav>
        </div>
        <div>
          <Nav bsStyle="pills" justified activeKey={1}>
            <NavItem eventKey={1}>NavItem 1 content</NavItem>
            <NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
            <NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
          </Nav>
        </div>
      </section>
    );
  }
}
@css(require('./Guidelines.css'))
class Popovers extends Component {
  render() {
    const popover = (
      <Popover id="popover-positioned" title="Popover">
        <strong>Holy guacamole!</strong> Check this info.
      </Popover>
    );
    return (
      <section>
        <h3>Тело всплывающего окна</h3>
        <div style={{ height: 120 }}>
          <Popover
            id="popover-basic"
            placement="right"
            positionLeft={200}
            positionTop={50}
            title="Popover right"
          >
            And here's some <strong>amazing</strong> content. It's very engaging. right?
          </Popover>
        </div>
        <h3>Всплывающие окна</h3>
        <div>
          <OverlayTrigger trigger="click" placement="left" overlay={popover}>
            <Button>Holy guacamole!</Button>
          </OverlayTrigger>
          <OverlayTrigger trigger="click" placement="top" overlay={popover}>
            <Button>Holy guacamole!</Button>
          </OverlayTrigger>
          <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <Button>Holy guacamole!</Button>
          </OverlayTrigger>
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <Button>Holy guacamole!</Button>
          </OverlayTrigger>
        </div>
      </section>
    );
  }
}
@css(require('./Guidelines.css'))
class Tooltips extends Component {
  render() {
    const tooltip = <Tooltip id="tooltip"><strong>Holy guacamole!</strong> Check this info.</Tooltip>;
    return (
      <section>
        <h3>Тело всплывающей подсказки</h3>
        <div>
          <div className="tooltip-static">
            <Tooltip placement="right" className="in" id="tooltip-right">
              Tooltip right
            </Tooltip>
            <Tooltip placement="top" className="in" id="tooltip-top">
              Tooltip top
            </Tooltip>
            <Tooltip placement="left" className="in" id="tooltip-left">
              Tooltip left
            </Tooltip>
            <Tooltip placement="bottom" className="in" id="tooltip-bottom">
              Tooltip bottom
            </Tooltip>
          </div>
        </div>
        <h3>Высплывающая подсказка</h3>
        <div>
          <OverlayTrigger placement="left" overlay={tooltip}>
            <Button bsStyle="default">Holy guacamole!</Button>
          </OverlayTrigger>

          <OverlayTrigger placement="top" overlay={tooltip}>
            <Button bsStyle="default">Holy guacamole!</Button>
          </OverlayTrigger>

          <OverlayTrigger placement="bottom" overlay={tooltip}>
            <Button bsStyle="default">Holy guacamole!</Button>
          </OverlayTrigger>

          <OverlayTrigger placement="right" overlay={tooltip}>
            <Button bsStyle="default">Holy guacamole!</Button>
          </OverlayTrigger>
        </div>
      </section>
    );
  }
}
@css(require('./Guidelines.css'))
class Modals extends Component {
  render() {
    return (
      <section>
        <h3>Статический вид</h3>
        <div>
          <div className="static-modal">
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                One fine body...
              </Modal.Body>

              <Modal.Footer>
                <Button>Close</Button>
                <Button bsStyle="primary">Save changes</Button>
              </Modal.Footer>

            </Modal.Dialog>
          </div>
        </div>
        <h3>Модалка</h3>
        <div>
          <ExampleModal />
        </div>
      </section>
    );
  }
}

function MySmallModal(props) {
  return (
    <Modal {...props} bsSize="small" aria-labelledby="contained-modal-title-sm">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-sm">Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.modalBody}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function MyLargeModal(props) {
  return (
    <Modal {...props} bsSize="large" aria-labelledby="contained-modal-title-lg">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.modalBody}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
@css(require('./Guidelines.css'))
class ExampleModal extends Component {
  constructor() {
    super();
    this.state = { showModal: false, smShow: false, lgShow: false };
  }
  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }
  render() {
    const smClose = () => this.setState({ smShow: false });
    const lgClose = () => this.setState({ lgShow: false });
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );
    const modalBody = (
      <div>
        <h4>Wrapped Text</h4>
        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
      </div>
    );
    return (
      <div>
        <ButtonToolbar>
          <Button bsSize="lg" onClick={() => this.setState({ lgShow: true })}>
            Large
          </Button>
          <Button onClick={this.open}>
            Default
          </Button>
          <Button bsSize="sm" onClick={() => this.setState({ smShow: true })}>
            Small
          </Button>
        </ButtonToolbar>

        <MySmallModal show={this.state.smShow} onHide={smClose} modalBody={modalBody} />
        <MyLargeModal show={this.state.lgShow} onHide={lgClose} modalBody={modalBody} />

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
            <h4>Popover in a modal</h4>
            <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>
            <h4>Tooltips in a modal</h4>
            <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>
            <hr />
            {modalBody}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
@css(require('./Guidelines.css'))
class Dropdowns extends Component {
  render() {
    const dropdownBody = [
      {
        eventKey: 1,
        children: 'Action',
      },
      {
        eventKey: 2,
        children: 'Another action',
      },
      {
        eventKey: 3,
        active: true,
        children: 'Active item',
      },
      {
        divider: true,
      },
      {
        eventKey: 4,
        children: 'Separated link',
      },
    ];
    return (
      <section>
        <h3>Выпадающие списки</h3>
        {ACTIONS.map(action => (
          SIZES.map((size, i) => (
            <div key={i}>
              {BUTTONS.map((title, i) => (
                <DropdownButton
                  key={i}
                  title={title}
                  bsSize={size}
                  bsStyle={title.toLowerCase()}
                  id={`dropdown-${size}-${i}`}
                  {...action}
                >
                  {dropdownBody.map((o, i) => <MenuItem key={i} {...o} />)}
                </DropdownButton>
              ))}
            </div>
          ))
        ))}
        <h3>Разделенные выпадающие списки</h3>
        {ACTIONS.map(action => (
          SIZES.map((size, i) => (
            <div key={i}>
              {BUTTONS.map((title, i) => (
                <SplitButton
                  key={i}
                  title={title}
                  bsSize={size}
                  bsStyle={title.toLowerCase()}
                  id={`split-button-basic-${i}`}
                  {...action}
                >
                  {dropdownBody.map((o, i) => <MenuItem key={i} {...o} />)}
                </SplitButton>
              ))}
            </div>
          ))
        ))}
        <h3>Без стрелочек</h3>
        <div>
          {BUTTONS.map((title, i) => (
            <DropdownButton key={i} bsStyle={title.toLowerCase()} title="No caret" noCaret id="dropdown-no-caret">
              {dropdownBody.map((o, i) => <MenuItem key={i} {...o} />)}
            </DropdownButton>
          ))}
        </div>
        <h3>Варианты выпадения списка</h3>
        <div>
          <SplitButton title="Dropup" dropup id="split-button-dropup">
            {dropdownBody.map((o, i) => <MenuItem key={i} {...o} />)}
          </SplitButton>
          <SplitButton title="Right dropup" dropup pullRight id="split-button-dropup-pull-right">
            {dropdownBody.map((o, i) => <MenuItem key={i} {...o} />)}
          </SplitButton>
          <SplitButton title="Dropdown right" pullRight id="split-button-pull-right">
            {dropdownBody.map((o, i) => <MenuItem key={i} {...o} />)}
          </SplitButton>
        </div>
        <h3>Меню выпадающего списка</h3>
        <div>
          <ul className="dropdown-menu" style={{ display: 'block', position: 'relative' }}>
            <MenuItem header>Header</MenuItem>
            <MenuItem>link</MenuItem>
            <MenuItem divider />
            <MenuItem header>Header</MenuItem>
            <MenuItem>link</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem title="See? I have a title.">
              link with title
            </MenuItem>
            <MenuItem eventKey={1} href="#someHref" onSelect={() => alert('Йо!')}>
              link that alerts
            </MenuItem>
          </ul>
        </div>
      </section>
    );
  }
}
@css(require('./Guidelines.css'))
class Buttons extends Component {
  render() {
    return (
      <section>
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
