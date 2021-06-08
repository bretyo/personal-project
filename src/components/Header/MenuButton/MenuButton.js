import HamburgerIcon from "./HamburgerIcon";

function MenuButton(props){
    return(
        <button className='menu-btn' onClick={props.toggleNav}>MENU {<HamburgerIcon/>}</button>
    )
}

export default MenuButton;