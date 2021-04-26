const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.emojify = functions.database.ref('messages/{pushId}/text')
    .onWrite
    (
        event => 
        {
            if (!event.after.exists() || event.before.exists()) 
            {
                console.log("not a new write event");
                return;
            }
            console.log("emojifying!");
            const originalText = event.after.val();
            const emojifiedText = emojifyText(originalText);
            return event.after.ref.set(emojifiedText);
        }
    );

// Returns text with keywords replaced by emoji
// Replacing with the regular expression /.../ig does a case-insensitive
// search (i flag) for all occurrences (g flag) in the string
function emojifyText(text)
{
    var emojifiedText = text;
    emojifiedText = emojifiedText.replace(/\blol\b/ig, "😂");
    emojifiedText = emojifiedText.replace(/\bcat\b/ig, "😸");
    return emojifiedText;
}
