export async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export async function handleDropdownCustom(elm) {
	var this_elm = document.querySelector(`.is-dropdown[data-parent="${elm}"]`);
	if(this_elm) this_elm.classList.toggle('hidden');
}