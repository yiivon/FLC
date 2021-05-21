class input {

}

class output {
	
}

class flc {
	var_inputs = [];
	var_outputs = [];

	app = {};

	sensors = [];
	fuzzey = null;

	 calc() {
	 		this.app.wizard = (ctx) => {
		let wnd = ui('user_edit_wnd');
		wnd._ctx = ctx;
		if (isNaN(wnd._ctx.node.id))
			wnd._ctx.node.id = _.toNumber(wnd._ctx.node.id.replace(/^R/i, ''));
		wnd.show();
	}


	 	return [];
	 }


	 reflect() {
	 	
 eval_role_privileges  (role, db, root_primitive_tree)  {
	let depart_path = role.department.superiors;
	let resources = [];     // resources of final upper of this user's
	let policy_level = 0;

	let i = 0;
	let departs = await db.department.findMany({
		where: {
			id: {
				in: depart_path.map((v) => +v)
			}
		},
		select: {
			id: true,
			resources: true,
			name: true,
			display_name: true,
			policy_level: true
		}
	});

	for (let upper_id of depart_path) {
		let a = departs.find((v) => +v.id === +upper_id);
		let b = departs.find((v) => +v.id === +depart_path[i + 1]);

		let a_resources = [];
		if (a.name === 'root') {
			a_resources = await resource_roottree_to_rows(root_primitive_tree);
		} else {
			a_resources = a.resources;
		}

		if (b) {
			if ((a?.policy_level ?? 0) > (b?.policy_level ?? 0)) {
				b.resources = eval_resources_with_parent(b.resources, a_resources);
				b.policy_level = a.policy_level;

				// save b to db
				let r = await db.department.update({
					where: {
						id: +b.id
					},
					data: {
						resources: b.resources,
						policy_level: +b.policy_level
					}
				});
			}
			resources = b.resources;
			policy_level = b.policy_level;
		} else {
			resources = a_resources;
			policy_level = a.policy_level;
		}

		if (i += 2 >= depart_path.length) break;
	}

	let privileges = eval_role_privileges_with_resources(role.privileges, resources)
	return {policy_level, privileges, resources};
}


	 }

	accept() {
		
	}
};




module.exports = {
	input,
	output,
	flc
};
