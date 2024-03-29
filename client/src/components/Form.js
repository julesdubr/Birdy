import React from 'react'
import '../styles/components/Form.css'
import { Link } from 'react-router-dom'

export default function Form(props) {
  return (
    <div className="form-card">
      <h2 className="form-title">{ props.title }</h2>
      <form className="form" onSubmit={props.onSubmit}>
        { props.children }
      </form>
    </div>
  )
}

export const FormGroup = React.forwardRef( (props, ref) => {
  return (
    <div className="form-group" id={props.id}>
      <label className="form-label">
        { props.children }
      </label>
      <input
        className="input"
        type={props.type}
        ref={ref}
        placeholder={props.placeholder}
        required={props.required}
        defaultValue={props.defaultValue} />
    </div>
  );
})

export function FormButton(props) {
  return (
    <button disable={props.disable} className="btn-primary form-button" onClick={props.onClick} type="submit">
      { props.children }
    </button>
  );
}

export function FormRouter(props) {
  return (
    <div className="form-router">
      { props.value } <Link className="link" to={props.to}>{ props.children }</Link>
    </div>
  );
}

export function FormInlineGroup(props) {
  return (
    <div className="form-group-inline">
      { props.children }
    </div>
  );
}