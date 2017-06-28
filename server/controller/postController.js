var db = require('../db_config.js');

function getHashTag (text) {
    var tagListArray = [];
    var regexp = new RegExp('#([^\\s]*)', 'g');
    var tmplist = text.match(regexp);

    for (var w in tmplist) {
        var hashSub = tmplist[ w ].split('#');
    
        for (var x in hashSub) {
            if (hashSub[x] != "") {
                  if (hashSub[x].substr(hashSub[x].length - 1) == ":") {
                      hashSub[x] = hashSub[x].slice(0, -1);
                  }
                  if (hashSub[x] != "") {
                      tagListArray.push(hashSub[x]);
                  }
            }
        }
    }
    return tagListArray;
};

function contains(list, word) {
    for (i in list) {
        if (list[i] == word) {
            return true;
        }
    }
    return false;
}

exports.list = function(callback) {
    db.User.find({}, function(error, users) {
        if (error) {
            callback({error: 'Não foi possível retornar as publicações'});
        } else {
            var listPosts = [];
            for (i in users) {
                if (users[i].posts.length > 0) {
                    listPosts.push(users[i].posts);
                }
            }
            callback(listPosts);
        }
    });
};

exports.userPosts = function(id, callback) {
    db.User.findById(id, function(error, user) {
        if (error) {
            callback({error: 'Não foi possível retornar as publicações do usuário'});
        } else {
            callback(user.posts);
        }
    });
};

exports.postsTags = function(callback) {
    db.User.find({}, function(error, users) {
        if (error) {
            callback({error: 'Não foi possível retornar as tags'});
        } else {
            var listTags = [];
            
            for (i in users) {
                for( j in users[i].posts) {
                    for (z in users[i].posts[j].tags) {
//                        if (!contains(listTags, users[i].posts[j].tags[z])) 
                            listTags.push(users[i].posts[j].tags[z]);
                    }
                }
            }
            callback(listTags);
        }
    });
};

exports.postsTag = function(tag, callback) {
   db.User.find({}, function(error, users) {
        if (error) {
            callback({error: 'Não foi possível retornar as tags'});
        } else {
            var listPosts = [];
            
            for (i in users) {
                for( j in users[i].posts) {
                    console.log(users[i].posts[j]);
                    for (z in users[i].posts[j].tags) {
                        if (contains(users[i].posts[j].tags, tag)) 
                            listPosts.push(users[i].posts[j]);
                        break;
                    }
                }
            }
            callback(listPosts);
        }
    });
};

exports.post = function(id, text, callback) {
    db.User.findById(id, function(error, user) {
        
        if (text.length > 1 && text.length <= 140) {
            var post = new db.Post ({
                username: user.fullname,
                text: text,
                tags: getHashTag(text)
            });
            user.posts.push(post);
        } else {
            callback({error: 'Quantidade de caracteres invalida, utilize de 2 a 140 caracteres'})
        }
        
        user.save(function(error, user) {
            if (error) {
                callback({error: 'Não foi possível a publicação do usuário'});
            } else {
                callback(user);
            }
        });
    });   
};