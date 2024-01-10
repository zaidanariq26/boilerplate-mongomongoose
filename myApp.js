require('dotenv').config();
let mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const personSchema = new mongoose.Schema({
	name: { type: String, required: true },
	age: { type: Number },
	favoriteFoods: { type: [String] },
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
	const newPerson = new Person({
		name: 'Phantom',
		age: 21,
		favoriteFoods: ['Pizza', 'Fried Chicken', 'Rendang'],
	});

	newPerson.save((err, data) => {
		if (err) {
			console.error('Failed to save data:', err);
		} else {
			console.log('Succeed to save data');
			done(null, data);
		}
	});
};

const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, (err, data) => {
		if (err) {
			console.error('Failed to save data:', err);
		} else {
			console.log('Succeed to save data', data);
			done(null, data);
		}
	});
};

const findPeopleByName = (personName, done) => {
	Person.find({ name: personName }, (err, data) => {
		if (err) {
			console.error('Failed to save data:', err);
		} else {
			console.log('Succeed to save data:', data);
			done(null, data);
		}
	});
};

const findOneByFood = (food, done) => {
	Person.findOne({ favoriteFoods: [food] }, (err, data) => {
		if (err) {
			console.error('Failed to save data:', err);
		} else {
			console.log('Succeed to save data:', data);
			done(null, data);
		}
	});
};

const findPersonById = (personId, done) => {
	Person.findById({ _id: personId }, (err, data) => {
		if (err) {
			console.error('Failed to save data:', err);
		} else {
			console.log('Succeed to save data:', data);
			done(null, data);
		}
	});
};

const findEditThenSave = (personId, done) => {
	const foodToAdd = 'hamburger';
	Person.findById(personId, (err, person) => {
		if (err) {
			console.log('Failed to save data:', err);
			done(err);
		} else {
			person.favoriteFoods.push(foodToAdd);
			person.save((err, data) => {
				if (err) {
					console.log('Failed to save data:', err);
					done(err);
				} else {
					console.log('Succeed to save data:', data);
					done(null, data);
				}
			});
		}
	});
};

const findAndUpdate = (personName, done) => {
	const ageToSet = 20;
	Person.findOne({ name: personName }, (err, person) => {
		if (err) {
			console.error('Failed to save data:', err);
			done(err);
		} else {
			person.age = ageToSet;
			person.new = true;
			person.save((err, data) => {
				if (err) {
					console.log('Failed to save data:', err);
					done(err);
				} else {
					console.log('Succeed to save data:', data);
					done(null, data);
				}
			});
		}
	});
};

const removeById = (personId, done) => {
	Person.findByIdAndRemove(personId, (err, data) => {
		if (err) {
			console.log('Failed to remove data:', err);
			done(err);
		} else {
			console.log('Succeed to remove data');
			done(null, data);
		}
	});
};

const removeManyPeople = (done) => {
	const nameToRemove = 'Mary';
	Person.remove({ name: nameToRemove }, (err, data) => {
		if (err) {
			console.log('Failed to remove data:', err);
			done(err);
		} else {
			console.log('Succeed to remove data: ', data);
			done(null, data);
		}
	});
};

const queryChain = (done) => {
	const foodToSearch = 'burrito';
	Person.find({ favoriteFoods: { $all: [foodToSearch] } })
		.sort({ name: 'asc' })
		.limit(2)
		.select('-age')
		.exec((err, data) => {
			if (err) {
				console.error('Failed to find data:', err);
			} else {
				console.log('Successfully found data:', data);
				done(null, data);
			}
		});
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
