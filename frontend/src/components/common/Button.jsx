const Button = ({children , onClick, disabled}) => (
    <button onClick = {onClick} disabled = {disabled} className = "button">
        {children}
    </button>
)
export default Button;