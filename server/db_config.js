var db_string = 'mongodb://localhost/tuitinho';

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no banco'));

db.once('open', function() {
    
    var postSchema = mongoose.Schema({
        username: String,
        text: String,
        tags: []
    });
    
    exports.Post = mongoose.model('Post', postSchema);
    
    var userSchema = mongoose.Schema({
        fullname: String,
        email: String,
        password: String,
        dateBirth: String,
        posts: []
    });
    
    exports.User = mongoose.model('User', userSchema);
    
});
