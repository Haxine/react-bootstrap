import classNames from 'classnames';
import React from 'react';
import warning from 'warning';

import { bsClass, getClassSet, prefix, splitBsProps }
  from './utils/bootstrapUtils';

const propTypes = {
  inline: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  /**
   * Only valid if `inline` is not set.
   */
  validationState: React.PropTypes.oneOf([
    'success', 'warning', 'error', null,
  ]),
  /**
   * Attaches a ref to the `<input>` element. Only functions can be used here.
   *
   * ```js
   * <Checkbox inputRef={ref => { this.input = ref; }} />
   * ```
   */
  inputRef: React.PropTypes.func,
};

const defaultProps = {
  inline: false,
  disabled: false,
};

class Checkbox extends React.Component {
  render() {
    const {
      inline,
      disabled,
      validationState,
      inputRef,
      className,
      style,
      children,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);

    const input = (
      <input
        {...elementProps}
        ref={inputRef}
        type="checkbox"
        disabled={disabled}
      />
    );

    if (inline) {
      const classes = {
        [prefix(bsProps, 'inline')]: true,
        disabled,
      };

      // Use a warning here instead of in propTypes to get better-looking
      // generated documentation.
      warning(
        !validationState,
        '`validationState` is ignored on `<Checkbox inline>`. To display ' +
        'validation state on an inline checkbox, set `validationState` on a ' +
        'parent `<FormGroup>` or other element instead.'
      );

      return (
        <label className={classNames(className, classes)} style={style}>
          {input}
          {children}
        </label>
      );
    }

    const classes = {
      ...getClassSet(bsProps),
      disabled,
    };
    if (validationState) {
      classes[`has-${validationState}`] = true;
    }

    return (
      <div className={classNames(className, classes)} style={style}>
        <label>
          {input}
          {children}
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

export default bsClass('checkbox', Checkbox);
