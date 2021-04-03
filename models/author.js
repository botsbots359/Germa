const { DateTime } = require("luxon");

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  let year_of_b = this.date_of_birth ? this.date_of_birth.getYear() : 0;
  let year_of_d = this.date_of_death ? this.date_of_death.getYear() : 0;
  lifespan_riz = (year_of_d - year_of_b).toString();
  return lifespan_riz;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

// Virtual for author's date_of_birth
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
  return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : 'no date';
});

// Virtual for author's date_of_death
AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
  return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : 'no date';
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);