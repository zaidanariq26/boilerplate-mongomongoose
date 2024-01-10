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

// const createAndSavePerson = () => {
// 	return new Promise((resolve, reject) => {
// 		const newPerson = new Person({
// 			name: 'Mbappe',
// 			age: 34,
// 			favoriteFoods: ['Tunjang', 'Ayam Goreng'],
// 		});

// 		newPerson.save((err, data) => {
// 			if (err) {
// 				console.error('Failed to save data:', err);
// 				reject(err);
// 			} else {
// 				console.log('Succeed to save data', data);
// 				resolve(data);
// 				mongoose.connection.close();
// 			}
// 		});
// 	});
// };

// createAndSavePerson()
// 	.then(() => {
// 		console.log('Operation completed');
// 	})
// 	.catch((error) => {
// 		console.error('Operation failed:', error);
// 	});

const getAllData = () => {
	return new Promise((resolve, reject) => {
		Person.find({})
			.sort({ name: -1 })
			.select('name')
			.limit(4)
			.exec((err, data) => {
				if (!err) {
					resolve(data);
					mongoose.connection.close();
				}
			});
	});
};

getAllData()
	.then((data) => console.log(data))
	.catch((err) => console.log(err));
