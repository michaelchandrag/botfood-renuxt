export async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export async function handleDropdownCustom(elm) {
	var this_elm = document.querySelector(`.is-dropdown[data-parent="${elm}"]`);
	if(this_elm) this_elm.classList.toggle('hidden');
}

export async function handlePaginateCustom(pagination = {}) {
	pagination.count_page = Math.ceil(parseInt(pagination.count)/parseInt(pagination.limit));
	var pg = (pagination.page>pagination.max_page) ? pagination.page : 1, nPg = 0;
	var is_links = [], is_link_befs = [];
	for(var cpg = pg; cpg<=pagination.count_page; cpg++){
		is_links.push(cpg);
		if(nPg==10){ break; }
		nPg++;
	}

	if(pg>pagination.max_page){
		let forBpg = (nPg<3) ? 10 : 5, forBpg2 = (nPg<3) ? 5 : 3;
		for(var bpg = pg-forBpg; bpg<pg-forBpg2; bpg++){
			is_link_befs.push(bpg);
		}
	}

	return {
		links : is_links,
		link_befs : is_link_befs,
		prev :  (pagination.page>1) ? parseInt(pagination.page)-1 : false,
		next : (pagination.page<pagination.count_page) ? parseInt(pagination.page)+1 : false,
		ready : (pagination.count_page > 1) ? true : false,
	}
}

export function handleAlertCustom(respone = {}, is_list = false, only_msg = true, type = null) {
	var msg = 'Failed process data or data not found';
	if(respone.response && respone.response.data){
		respone = respone.response.data;
	}

	if(respone.errors && respone.errors.length){
		var is_errors = respone.errors[0];
		if(is_errors.detail) msg = is_errors.detail;
	}

	if(type != 'error'){
		msg = 'Data berhasil diproses';
		if(is_list && type){
			msg = (!respone.success || (respone.success && (!respone.data || !respone.data[type] || !respone.data[type].length))) ? 'Tidak ada data ditemukan' : 'Data loaded';
		}

		if(respone.msg) msg = respone.msg;
		if(respone.message) msg = respone.msg;
	}
	if(!only_msg) return alertCustom('', msg);
	return msg;
}

export function alertCustom(title = 'Info', msg = 'informasi') {
 	return alert(msg);
}