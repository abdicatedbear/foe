
Abilities.EnemySkill = {};

Abilities.EnemySkill.Sting = new Ability();
Abilities.EnemySkill.Sting.name = "Sting";
Abilities.EnemySkill.Sting.Short = function() { return "Tail attack with chance of poisoning the target."; }
Abilities.EnemySkill.Sting.cost = { hp: null, sp: 10, lp: null};
Abilities.EnemySkill.Sting.cooldown = 2;
Abilities.EnemySkill.Sting.castTree.push(AbilityNode.Template.Physical({
	atkMod: 1.2,
	hitMod: 0.8,
	damageType: {pPierce: 1},
	onCast: [function(ability, encounter, caster, target) {
		var parse = AbilityNode.DefaultParser(caster, target);
		Text.Add("[Name] read[y] [hisher] stinger, aiming it at [tname]!", parse);
		Text.NL();
	}],
	onMiss: [Abilities.Physical._onMiss],
	onDamage: [function(ability, encounter, caster, target, dmg) {
		var parse = AbilityNode.DefaultParser(caster, target);
		Text.Add("[Name] sting[notS] [tname] for " + Text.BoldColor(-dmg, "#800000") + " damage!", parse);
		Text.NL();
	}],
	onAbsorb: [Abilities.Physical._onAbsorb],
	onHit: [function(ability, encounter, caster, target) {
		var parse = AbilityNode.DefaultParser(caster, target);
		if(Status.Venom(target, { hit : 0.6, turns : 3, turnsR : 3, str : 1, dmg : 0.15 })) {
			Text.Add("[tName] [thas] been poisoned!", parse);
		}
	}]
}));


// Orchid
Abilities.EnemySkill.TSnare = new Ability();
Abilities.EnemySkill.TSnare.name = "T.Snare";
Abilities.EnemySkill.TSnare.Short = function() { return "Slows down the target and raises lust."; }
Abilities.EnemySkill.TSnare.cost = { hp: null, sp: 20, lp: null};
Abilities.EnemySkill.TSnare.castTree.push(AbilityNode.Template.Physical({
	damageType: {lust: 0.1},
	onCast: [function(ability, encounter, caster, target) {
		var parse = AbilityNode.DefaultParser(caster, target);
		Text.Add("[Name] send[notS] [hisher] tentacles rushing toward [tname], wrapping them around [thimher]. ", parse);
		Text.NL();
	}],
	onMiss: [function(ability, encounter, caster, target) {
		var parse = AbilityNode.DefaultParser(caster, target);
		Text.Add("[tName] only narrowly avoid[tnotS] getting caught by the vines!", parse);
		Text.NL();
	}],
	onDamage: [Abilities.Physical._onDamage],
	onAbsorb: [Abilities.Physical._onAbsorb],
	onHit: [function(ability, encounter, caster, target) {
		var parse = AbilityNode.DefaultParser(caster, target);
		if(Status.Slow(target, { hit : 0.6, factor : 2, turns : 3, turnsR : 3 })) {
			Text.Add("The tentacles successfully snare [tname], restricting [thisher] movements!", parse);
		}
	}]
}));


Abilities.EnemySkill.TSpray = new Ability();
Abilities.EnemySkill.TSpray.name = "T.Spray";
Abilities.EnemySkill.TSpray.Short = function() { return "Sprays the targets in sticky tentacle seed. Raises lust."; }
Abilities.EnemySkill.TSpray.cost = { hp: null, sp: 40, lp: null};
Abilities.EnemySkill.TSpray.targetMode = TargetMode.Enemies;
Abilities.EnemySkill.TSpray.cooldown = 2;
Abilities.EnemySkill.TSpray.castTree.push(AbilityNode.Template.Physical({
	damageType: {lust: 0.1},
	onCast: [function(ability, encounter, caster, target) {
		var parse = AbilityNode.DefaultParser(caster);
		parse["foes"] = target.length > 1 ? "foes" : "foe";
		Text.Add("[Name] brandish[notEs] [hisher] tentacles, pointing them toward [hisher] [foes]. In a great fountain, sticky strands of cum splatter from the cock-like tentacles!", parse);
		Text.NL();
	}],
	onMiss: [function(ability, encounter, caster, target) {
		var parse = AbilityNode.DefaultParser(caster, target);
		Text.Add("[tName] manage[tnotS] to avoid getting hit by the blast!", parse);
		Text.NL();
	}],
	onDamage: [Abilities.Physical._onDamage],
	onAbsorb: [Abilities.Physical._onAbsorb],
	onHit: [function(ability, encounter, caster, target) {
		var parse = AbilityNode.DefaultParser(caster, target);
		Text.Add("[tName] take[tnotS] the full brunt of the spray, gaining a thick coating of tentacle spunk!", parse);
		Text.NL();
		target.AddLustFraction(0.2);
	}]
}));


Abilities.EnemySkill.TVenom = new Ability();
Abilities.EnemySkill.TVenom.name = "T.Venom";
Abilities.EnemySkill.TVenom.Short = function() { return "Sprays one target in poisonous goop."; }
Abilities.EnemySkill.TVenom.cost = { hp: null, sp: 20, lp: null};
Abilities.EnemySkill.TSpray.cooldown = 1;
Abilities.EnemySkill.TVenom.castTree.push(AbilityNode.Template.Physical({
	hitMod: 0.8,
	damageType: {lust: 0.3},
	onCast: [function(ability, encounter, caster, target) {
		var parse = AbilityNode.DefaultParser(caster, target);
		Text.Add("[Name] direct[notS] [hisher] tentacles toward [tname], spraying a long gout of toxic goop toward [thimher]! ", parse);
	}],
	onMiss: [function(ability, encounter, caster, target) {
		var parse = AbilityNode.DefaultParser(caster, target);
		Text.Add("[tName] narrowly avoid[tnotS] the blast, escaping unharmed!", parse);
	}],
	onDamage: [function(ability, encounter, caster, target) {
		var parse = AbilityNode.DefaultParser(caster, target);
		Text.Add("[tName] cough[tnotS] and sputter[tnotS] as [theshe] is hit by the poisonous liquid!", parse);
		Text.NL();
	}],
	onAbsorb: [Abilities.Physical._onAbsorb],
	onHit: [function(ability, encounter, caster, target) {
		var parse = AbilityNode.DefaultParser(caster, target);
		if(Status.Venom(target, { hit : 0.6, turns : 3, turnsR : 3, str : 1, dmg : 0.15 })) {
			Text.Add("[tName] [thas] been poisoned!", parse);
		}
	}]
}));


Abilities.EnemySkill.TRavage = new Ability();
Abilities.EnemySkill.TRavage.name = "T.Ravage";
Abilities.EnemySkill.TRavage.Short = function() { return "Grasps the enemy and constricts them, dealing damage and raising lust."; }
Abilities.EnemySkill.TRavage.cost = { hp: null, sp: 25, lp: null};
Abilities.EnemySkill.TRavage.castTree.push(AbilityNode.Template.Physical({
	damageType: {lust: 0.5, pBlunt: 0.5},
	onCast: [function(ability, encounter, caster, target) {
		var parse = AbilityNode.DefaultParser(caster, target);
		Text.Add("[Name] send[notS] [hisher] tentacles rushing toward [tname], aiming to catch [thimher]! ", parse);
	}],
	onMiss: [function(ability, encounter, caster, target) {
		var parse = AbilityNode.DefaultParser(caster, target);
		Text.Add("The tentacles narrowly miss [tname], merely grazing [thimher].", parse);
	}],
	onDamage: [function(ability, encounter, caster, target, dmg) {
		var parse = AbilityNode.DefaultParser(caster, target);
		Text.Add("[tName] can’t avoid the squirming mass of tentacles that quickly wrap around [thisher] body, and [theshe] cr[ty] out as the viny tendrils violate [thimher]. Somehow, the snakey tentacles manage to find their way past [tposs] defenses, ravaging [thimher]!", parse);
		Text.NL();
		Text.Add("[tName] only barely manage[tnotS] to break [poss] hold on [thimher], but not before the tentacles have gotten real close and personal.", parse);
		Text.NL();
		Text.Add("[tName] take[tnotS] " + Text.BoldColor(-dmg, "#800000") + " damage!", parse);
		target.AddLustFraction(0.3);
	}],
	onAbsorb: [Abilities.Physical._onAbsorb]
}));


Abilities.EnemySkill.TWhip = new Ability();
Abilities.EnemySkill.TWhip.name = "T.Whip";
Abilities.EnemySkill.TWhip.Short = function() { return "Standard attack. Whips target for blunt damage."; }
Abilities.EnemySkill.TWhip.cost = { hp: null, sp: null, lp: null};
Abilities.EnemySkill.TWhip.castTree.push(AbilityNode.Template.Physical({
	damageType: {lust: 0.5, pBlunt: 1},
	onCast: [function(ability, encounter, caster, target) {
		var parse = AbilityNode.DefaultParser(caster, target);
		Text.Add("[Name] thrash[notEs] out with [hisher] tentacles, slashing [tname]! ", parse);
	}],
	onMiss: [function(ability, encounter, caster, target) {
		var parse = AbilityNode.DefaultParser(caster, target);
		Text.Add("The tentacles narrowly miss [tname], hitting empty air!", parse);
	}],
	onDamage: [function(ability, encounter, caster, target, dmg) {
		var parse = AbilityNode.DefaultParser(caster, target);
		Text.Add("[tName] [tis] unable to avoid the blow, and stagger[tnotS] back as it hits, dealing " + Text.BoldColor(-dmg, "#800000") + " damage!", parse);
		Text.NL();
		target.AddLustFraction(0.3);
	}],
	onAbsorb: [Abilities.Physical._onAbsorb]
}));


Abilities.EnemySkill.TViolate = new Ability();
Abilities.EnemySkill.TViolate.name = "T.Violate";
Abilities.EnemySkill.TViolate.Short = function() { return "Orchid's violate attack."; }
Abilities.EnemySkill.TViolate.cost = { hp: null, sp: null, lp: null};
Abilities.EnemySkill.TViolate.castTree.push(AbilityNode.Template.Physical({
	damageType: {lust: 1, pBlunt: 0.5},
	hitMod: 2,
	onCast: [function(ability, encounter, caster, target) {
		var parse = AbilityNode.DefaultParser(caster, target);
		Text.Add("Orchid grins lewdly as she lashes out with her tentacles, aiming for [tname]! ", parse);
	}],
	onMiss: [function(ability, encounter, caster, target) {
		var parse = AbilityNode.DefaultParser(caster, target);
		Text.Add("Even though [tname] [tis] greatly aroused, [theshe] somehow manage[tnotS] to evade getting tangled up in the tentacles.", parse);
	}],
	onDamage: [Abilities.Physical._onDamage],
	onAbsorb: [Abilities.Physical._onAbsorb],
	onHit: [function(ability, encounter, caster, target) {
		var parse = AbilityNode.DefaultParser(caster, target);
		parse["tarmor"] = target.ArmorDesc();
		Text.Add("[tName] [tis] very aroused, and [thisher] reaction is dulled. The dryad laughs triumphantly as she strings [tname] up in the air, her tentacles worming their way inside [tposs] [tarmor]!", parse);
		Text.NL();
		if(target == player) {
			parse["vagDesc"]  = function() { return player.FirstVag().Short(); }
			parse["anusDesc"] = function() { return player.Butt().AnalShort(); }
			parse["vag"] = player.FirstVag() ? Text.Parse(" [vagDesc] and", parse) : "";
			Text.Add("You gasp as multiple plant-cocks press their way inside your[vag] [anusDesc]. A bad move it turns out, as additional ones shove their way inside your throat.", parse);
			Text.NL();
			
			if(player.FirstVag()) {
				Sex.Vaginal(orchid, player);
				player.FuckVag(player.FirstVag(), orchid.FirstCock(), 2);
				orchid.Fuck(orchid.FirstCock(), 2);
			}
			Sex.Anal(orchid, player);
			player.FuckAnal(player.Butt(), orchid.FirstCock(), 2);
			orchid.Fuck(orchid.FirstCock(), 2);
			
			Sex.Blowjob(player, orchid);
			player.FuckOral(player.Mouth(), orchid.FirstCock(), 2);
			orchid.Fuck(orchid.FirstCock(), 2);
			
			Text.NL();
			Text.Add("You groan as your body protests against the massive strain of a dozen tentacles violently raping your every hole. The intense pressure quickly pushes you over the edge, and you feel your energy drain even as Orchid pumps her seed into you.", parse);
		}
		else {
			Text.Add("You scamper to [tposs] aid, feebly trying to pull the tentacles away from [thimher], but the dryad is strong. [tName] gargles as [thisher] throat is violated, yet more tentacles seeking [thisher] crotch.", parse);
			Text.NL();
			Text.Add("[tName] climaxes loudly, struggling helplessly against the invasive tentacles. Orchid laughs as she pumps [tname] full of her seed, making a mess of your companion.", parse);
		}
		Text.NL();
		Text.Add("<i>“That was merely a taste of what is to come,”</i> the corrupted dryad purrs as she discards [tname] on the ground.", parse);
		Text.NL();
		
		var dmg = Math.floor(target.curLust);
		target.AddHPAbs(-dmg);
		
		Text.Add("[tName] take[tnotS] " + Text.BoldColor(dmg, "#800000") + " damage!", parse);
		
		var cum = target.OrgasmCum();
	}]
}));




// Gol
//TODO REPLACE
Abilities.EnemySkill.GolLustyPheromones = new TeaseSkill();
Abilities.EnemySkill.GolLustyPheromones.name = "L.Pheromones";
Abilities.EnemySkill.GolLustyPheromones.Short = function() { return "Attack with lusty pheromones."; }
Abilities.EnemySkill.GolLustyPheromones.OnCast = function(encounter, caster, target) {
	var parse = { Possessive : caster.Possessive(), name : caster.NameDesc(), heshe : caster.heshe(), himher : caster.himher(), hisher : caster.hisher(), y : caster.plural() ? "y" : "ies", s : caster.plural() ? "" : "s", tName : target.nameDesc() };
	Text.Add("The Gol reaches down to just below the joint of her humanoid upper body and mantis-like lower form where an immense, juicy-looking pussy lies. She hooks her fingers into either side of it, panting at the sensation, and pulls it open, allowing you gaze into the simmering, pink depths. It's easily big enough to swallow your arm, but far more alarming is the scent it exudes - sweet and enticing.", parse);
	Text.NL();
	caster.AddLustFraction(0.1);
}
Abilities.EnemySkill.GolLustyPheromones.OnHit = function(encounter, caster, target, dmg) {
	var parse = { notEs : caster.plural() ? "es" : "", Name : target.NameDesc(), hisher : target.hisher() };
	
	Text.Add("[Name] blush[notEs] as [hisher] head swims with thoughts of naked trysts under the stars, overwhelmed by the Gol’s pheromones.", parse);
	Text.NL();
}
Abilities.EnemySkill.GolLustyPheromones.OnMiss = function(encounter, caster, target) {
	var parse = { notS : caster.plural() ? "s" : "", Name : target.NameDesc(), hisher : target.hisher() };
	
	Text.Add("[Name] hold[notS] [hisher] breath to avoid as much of it as possible. Frowning, the Gol releases her netherlips.", parse);
	Text.NL();
}


//TODO REPLACE
Abilities.EnemySkill.GolCuntDash = new AttackPhysical();
Abilities.EnemySkill.GolCuntDash.name = "C.Dash";
Abilities.EnemySkill.GolCuntDash.Short = function() { return "Cunt dash!"; }
Abilities.EnemySkill.GolCuntDash.cost = { hp: null, sp: 50, lp: null};
Abilities.EnemySkill.GolCuntDash.atkMod = 1.3;
Abilities.EnemySkill.GolCuntDash.hitMod = 0.8;
Abilities.EnemySkill.GolCuntDash.damageType.pBlunt = 1;
Abilities.EnemySkill.GolCuntDash.damageType.pLust = 0.5;
Abilities.EnemySkill.GolCuntDash.OnCast = function(encounter, caster, target) {
	var parse = { name : target.nameDesc() };
	Text.Add("Without warning, the Gol launches herself forward, legs clattering as she approaches [name] with blinding speed. ", parse);
	
	caster.AddLustFraction(0.1);
}
Abilities.EnemySkill.GolCuntDash.OnHit = function(encounter, caster, target, dmg) {
	var parse = { Name : target.NameDesc(), name : target.nameDesc(), notS : target.plural() ? "s" : "", poss : target.possessive() };
	parse = target.ParserPronouns(parse);
	
	Text.Add("[Name] react[notS] a little too late to dive out the way, but [heshe] manage[notS] to duck low in an attempt to slip under her scythes… just not low enough. Her oncoming crotch and abdomen smack into [name], and her fragrant pussy drags across [poss] face and slimes it with a thick coat of her vaginal juices. The chitin of her underbelly is quite soft on [poss] cheek, almost like a pleasant caress.", parse);
	Text.NL();
	Text.Add("The Gol queen bashes [name] for " + Text.BoldColor(dmg, "#800000") + " damage, staggering [himher]!", parse);
	Text.NL();
	Text.Add("When she finishes charging past, [name] blink[notS] in a daze and stagger to [hisher] feet, uncomfortably warm in all the wrong places.", parse);
	Text.NL();
}
Abilities.EnemySkill.GolCuntDash.OnMiss = function(encounter, caster, target) {
	var parse = { himher : target.himher(), notEs : target.plural() ? "" : "es", Name : target.NameDesc() };
	
	Text.Add("[Name] barely toss[notEs] [himher]self out of the way in time!", parse);
	Text.NL();
}


//TODO REPLACE
Abilities.EnemySkill.GolPollen = new AttackPhysical();
Abilities.EnemySkill.GolPollen.name = "S.Pollen";
Abilities.EnemySkill.GolPollen.Short = function() { return "Submission pollen."; }
Abilities.EnemySkill.GolPollen.cost = { hp: null, sp: null, lp: 250 };
Abilities.EnemySkill.GolPollen.atkMod = 0;
Abilities.EnemySkill.GolPollen.hitMod = 0.8;
Abilities.EnemySkill.GolPollen.targetMode = TargetMode.Enemies;
Abilities.EnemySkill.GolPollen.OnCast = function(encounter, caster, target) {
	var parse = {};
	Text.Add("Sighing, the Gol runs her hands through her shimmering black hair in frustration. After her fingers' first pass, she repeats the action, then does it again. And again. Soon the air around her seems slightly foggy, and your nose itches. A sneeze wracks your body as she continues the motion, filling the air with... something. You can't say what, but it's making you sneeze, and causing your nose to get itchy and irritable. The insectile beauty seems taller and more imposing after each involuntary spasm of your body. Her breasts appear larger, her pussy more inviting, and her face more charmingly human. For a monster, she wouldn't be a bad one to settle down with.", parse);
	Text.NL();
}
Abilities.EnemySkill.GolPollen.OnHit = function(encounter, caster, target) {
	var parse = { Name : target.NameDesc(), is : target.is() };
	target.AddLustFraction(0.2);
	
	if(Status.Slow(target, { hit : 0.6, factor : 2, turns : 1, turnsR : 3 })) {
		Text.Add("[Name] [is] slowed! ", parse);
	}
	if(Status.Horny(target, { hit : 0.6, str : 1, dmg : 0.1, turns : 1, turnsR : 3 })) {
		Text.NL();
		Text.Add("[Name] [is] horny! ", parse);
	}
	if(Status.Sleep(target, { hit : 0.5, turns : 1, turnsR : 3 })) {
		Text.NL();
		Text.Add("[Name] [is] drowsy! ", parse);
	}
	if(Status.Confuse(target, { hit : 0.3, turns : 1, turnsR : 3 })) {
		Text.NL();
		Text.Add("[Name] [is] confused! ", parse);
	}
}
Abilities.EnemySkill.GolPollen.OnMiss = null;


// Corishev
//TODO REPLACE
Abilities.EnemySkill.Corishev = {};
Abilities.EnemySkill.Corishev.Whip = new AttackPhysical();
Abilities.EnemySkill.Corishev.Whip.name = "Whip";
Abilities.EnemySkill.Corishev.Whip.Short = function() { return "Corishev Whip."; }
Abilities.EnemySkill.Corishev.Whip.atkMod = 1;
Abilities.EnemySkill.Corishev.Whip.hitMod = 1;
Abilities.EnemySkill.Corishev.Whip.damageType.pSlash = 1;
Abilities.EnemySkill.Corishev.Whip.OnCast = function(encounter, caster, target) {
	var parse = { tname : target.nameDesc() };
	Text.Add("The lieutenant raises his arm, sending his whip lashing toward [tname].", parse);
	Text.NL();
}
Abilities.EnemySkill.Corishev.Whip.TargetEffect = function(encounter, caster, target) {
	var parse = { Name: target.NameDesc(), is: target.is(), himher : target.himher() };
	Text.Add("The whip’s lust inducing poison quickly seeps into the wound, arousing [himher]!", parse);
	
	target.AddLustFraction(0.2 + 0.3 * Math.random());
	
	if(Status.Bleed(target, { hit : 0.6, str : 1, dmg : 0.1, turns : 1, turnsR : 2 })) {
		Text.NL();
		Text.Add("[Name] [is] bleeding!", parse);
	}
}


//TODO REPLACE
Abilities.EnemySkill.Corishev.Lashing = new AttackPhysical();
Abilities.EnemySkill.Corishev.Lashing.name = "Corishev.Lashing";
Abilities.EnemySkill.Corishev.Lashing.Short = function() { return "Corishev lashing."; }
Abilities.EnemySkill.Corishev.Lashing.cost = { hp: null, sp: 30, lp: 50};
Abilities.EnemySkill.Corishev.Lashing.atkMod = 0.6;
Abilities.EnemySkill.Corishev.Lashing.hitMod = 0.7;
Abilities.EnemySkill.Corishev.Lashing.nrAttacks = 4;
Abilities.EnemySkill.Corishev.Lashing.damageType.pPierce = 1;
Abilities.EnemySkill.Corishev.Lashing.OnCast = function(encounter, caster, target) {
	var parse = { tname : target.nameDesc() };
	Text.Add("Laughing maniacally, Corishev swings his whip wildly, raining down a hail of lashes on [tname].", parse);
	Text.NL();
}
Abilities.EnemySkill.Corishev.Lashing.OnHit = function(encounter, caster, target, dmg) {
	var parse = { tposs : target.possessive(), skin : target.SkinDesc() };
	
	Text.Add("The barbed tip of the poisoned whip slashes across [tposs] [skin], dealing " + Text.BoldColor(dmg, "#800000") + " damage!", parse);
	Text.NL();
}
Abilities.EnemySkill.Corishev.Lashing.OnMiss = function(encounter, caster, target) {
	var parse = { HeShe: target.HeShe(), s: target.plural() ? "" : "s" };
	
	Text.Add("[HeShe] barely manage[s] to evade the blow.", parse);
	Text.NL();
}


//TODO REPLACE
Abilities.EnemySkill.Corishev.WideStrike = new AttackPhysical();
Abilities.EnemySkill.Corishev.WideStrike.name = "Corishev.WideStrike";
Abilities.EnemySkill.Corishev.WideStrike.Short = function() { return "Corishev lashing."; }
Abilities.EnemySkill.Corishev.WideStrike.cost = { hp: null, sp: 30, lp: 30};
Abilities.EnemySkill.Corishev.WideStrike.atkMod = 1.2;
Abilities.EnemySkill.Corishev.WideStrike.targetMode = TargetMode.Enemies;
Abilities.EnemySkill.Corishev.WideStrike.damageType.pPierce = 1;
Abilities.EnemySkill.Corishev.WideStrike.OnCast = function(encounter, caster, target) {
	var parse = {};
	Text.Add("The crazed lieutenant swings his whip in an arc, hoping to catch the both of you with a single strike.", parse);
	Text.NL();
}
Abilities.EnemySkill.Corishev.WideStrike.OnHit = function(encounter, caster, target, dmg) {
	var parse = { tposs : target.possessive(), himher : target.himher() };
	
	Text.Add("Poisoned barbs sink into [tposs] flesh, causing [himher] to take " + Text.BoldColor(dmg, "#800000") + " damage!", parse);
	Text.NL();
}
Abilities.EnemySkill.Corishev.WideStrike.OnMiss = function(encounter, caster, target) {
	var parse = { tname : target.nameDesc() };
	
	Text.Add("Thankfully, the blow swings wide, missing [tname] completely.", parse);
	Text.NL();
}


//TODO REPLACE
Abilities.EnemySkill.Corishev.SelfHarm = new Ability();
Abilities.EnemySkill.Corishev.SelfHarm.name = "SelfHarm";
Abilities.EnemySkill.Corishev.SelfHarm.Short = function() { return "Corishev SelfHarm."; }
Abilities.EnemySkill.Corishev.SelfHarm.targetMode = TargetMode.Self;
Abilities.EnemySkill.Corishev.SelfHarm.CastInternal = function(encounter, caster) {
	var parse = {
		
	};
	
	Text.Add("<i>“Yes… Yes!”</i> Corishev pants, the sounds of his whip repeatedly hitting his own flesh echoing throughout the dungeon. <i>“Ah… the fight excites me so… I’ll let you have a taste of it too, this burning lust!”</i>", parse);
	Text.Flush();
	
	caster.AddLustFraction(0.3);
	
	Status.Horny(caster, { hit : 2, str : 1, dmg : 0.1, turns : 3, turnsR : 3 });
	
	Gui.NextPrompt(function() {
		encounter.CombatTick();
	});
}


//TODO REPLACE
Abilities.EnemySkill.Corishev.Punish = new AttackPhysical();
Abilities.EnemySkill.Corishev.Punish.name = "Corishev.Punish";
Abilities.EnemySkill.Corishev.Punish.Short = function() { return "Corishev lashing."; }
Abilities.EnemySkill.Corishev.Punish.cost = { hp: null, sp: null, lp: 200 };
Abilities.EnemySkill.Corishev.Punish.atkMod = 3;
Abilities.EnemySkill.Corishev.Punish.hitMod = 2;
Abilities.EnemySkill.Corishev.Punish.damageType.pPierce = 1;
Abilities.EnemySkill.Corishev.Punish.OnCast = function(encounter, caster, target) {
	var parse = { tname : target.nameDesc(), tName : target.NameDesc(), himher: target.himher(), is: target.is() };
	Text.Add("<i>“You can feel it, can you not? This burning fire coursing through your veins...”</i> Corishev purrs as he licks his whip, fixing his eyes on [tname]. <i>“Let it flow, let the pain mix with the pleasure, until it consumes you whole!”</i> Whirling around with dizzying speed, the crazed lieutenant unleashes a massive attack toward [himher].", parse);
	Text.NL();
	
	if(Status.Horny(target, { hit : 0.6, str : 1, dmg : 0.1, turns : 1, turnsR : 3 })) {
		Text.Add("[tName] [is] horny! ", parse);
		Text.NL();
	}
}
Abilities.EnemySkill.Corishev.Punish.OnHit = function(encounter, caster, target, dmg) {
	var parse = { tname : target.nameDesc(), is : target.is(), yIes: target.plural() ? "y" : "ies" };
	
	parse = target.ParserPronouns(parse);
	
	Text.Add("Caught by surprise - or perhaps distracted by [hisher] pounding heart - [tname] [is] unable to dodge the flurry of blows raining down on [himher]. [HeShe] cr[yIes] out in pain as the whip lacerates [hisher] flesh time and time again, dealing " + Text.BoldColor(dmg, "#800000") + " damage!", parse);
	Text.NL();
}
Abilities.EnemySkill.Corishev.Punish.OnMiss = function(encounter, caster, target) {
	var parse = { tName: target.NameDesc(), is: target.is(), hisher: target.hisher(), skin: target.SkinDesc() };
	
	Text.Add("[tName] [is] barely able to avoid the brunt of Corishev’s onslaught, but some of the poison from his whip still lands on [hisher] [skin], causing some vicious burning.", parse);
	Text.NL();
}
