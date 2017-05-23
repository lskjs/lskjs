export default class Dropdowns extends Component {
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
      <section className="guideline__section">
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
