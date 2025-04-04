import random
from flask import Flask, session, redirect, url_for, request, render_template

app = Flask(__name__)
app.secret_key = 'your_secret_key'

def choose_word():
    words = ["the", "of", "and", "a", "to", "in", "is", "you", "that", "it", "he", "was", "for", "on", "are", "as", "with", "his", "they", "I", "at", "be", "this", "have", "from",
    "or", "one", "had", "by", "word", "but", "not", "what", "all", "were", "we", "when", "your", "can", "said", "there", "use", "an", "each", "which", "she", "do", "how", "their", "if",
    "will", "up", "other", "about", "out", "many", "then", "them", "these", "so", "some", "her", "would", "make", "like", "him", "into", "time", "has", "look", "two", "more", "write", "go", "see",
    "number", "no", "way", "could", "people", "my", "than", "first", "water", "been", "call", "who", "oil", "its", "now", "find", "long", "down", "day", "did", "get", "come", "made", "may", "part",
    "over", "new", "sound", "take", "only", "little", "work", "know", "place", "year", "live", "me", "back", "give", "most", "very", "after", "thing", "our", "just", "name", "good", "sentence", "man", "think",
    "say", "great", "where", "help", "through", "much", "before", "line", "right", "too", "mean", "old", "any", "same", "tell", "boy", "follow", "came", "want", "show", "also", "around", "form", "three", "small",
    "set", "put", "end", "does", "another", "well", "large", "must", "big", "even", "such", "because", "turn", "here", "why", "ask", "went", "men", "read", "need", "land", "different", "home", "us", "move",
    "try", "kind", "hand", "picture", "again", "change", "off", "play", "spell", "air", "away", "animal", "house", "point", "page", "letter", "mother", "answer", "found", "study", "still", "learn", "should", "America", "world",
    "high", "every", "near", "add", "food", "between", "own", "below", "country", "plant", "last", "school", "father", "keep", "tree", "never", "start", "city", "earth", "eye", "light", "thought", "head", "under", "story",
    "saw", "left", "few", "while", "along", "might", "close", "something", "seem", "next", "hard", "open", "example", "begin", "life", "always", "those", "both", "paper", "together", "got", "group", "often", "run",
    "important", "until", "children", "side", "feet", "car", "mile", "night", "walk", "white", "sea", "began", "grow", "took", "river", "four", "carry", "state", "once", "book", "hear", "stop", "without", "second", "later",
    "miss", "idea", "enough", "eat", "face", "watch", "far", "Indian", "really", "almost", "let", "above", "girl", "sometimes", "mountain", "cut", "young", "talk", "soon", "list", "song", "being", "leave", "family",
    "body", "music", "color", "stand", "sun", "question", "fish", "area", "mark", "dog", "horse", "birds", "problem", "complete", "room", "knew", "since", "ever", "piece", "told", "usually", "friends", "easy", "heard",
    "order", "red", "door", "sure", "become", "top", "ship", "across", "today", "during", "short", "better", "best", "however", "low", "hours", "black", "products", "happened", "whole", "measure", "remember", "early", "waves", "reached",
    "listen", "wind", "rock", "space", "covered", "fast", "several", "hold", "himself", "toward", "five", "step", "morning", "passed", "vowel", "true", "hundred", "against", "pattern", "numeral", "table", "north", "slowly", "money", "map",
    "farm", "pulled", "draw", "voice", "seen", "cold", "cried", "plan", "notice", "south", "sing", "war", "ground", "fall", "king", "town", "unit", "figure", "certain", "field", "travel", "wood", "fire", "upon",
    "done", "English", "road", "halt", "ten", "fly", "gave", "box", "finally", "wait", "correct", "oh", "quickly", "person", "became", "shown", "minutes", "strong", "verb", "stars", "front", "feel", "fact", "inches", "street",
    "decided", "contain", "course", "surface", "produce", "building", "ocean", "class", "note", "nothing", "rest", "carefully", "scientists", "inside", "wheels", "stay", "green", "known", "island", "week", "less", "machine", "base", "ago", "stood",
    "plane", "system", "behind", "ran", "round", "boat", "game", "force", "brought", "understand", "warm", "common", "bring", "explain", "dry", "though", "language", "shape", "deep", "thousands", "yes", "clear", "equation", "yet", "government",
    "filled", "heat", "full", "hot", "check", "object", "am", "rule", "among", "noun", "power", "cannot", "able", "six", "size", "dark", "ball", "material", "special", "heavy", "fine", "pair", "circle", "include", "built",
    "matter", "square", "syllables", "perhaps", "bill", "felt", "suddenly", "test", "direction", "center", "farmers", "ready", "anything", "divided", "general", "energy", "subject", "Europe", "moon", "region", "return", "believe", "dance", "members",
    "picked", "simple", "cells", "paint", "mind", "love", "cause", "rain", "exercise", "eggs", "train", "blue", "wish", "drop", "developed", "window", "difference", "distance", "heart", "sit", "sum", "summer", "wall", "forest", "probably",
    "legs", "sat", "main", "winter", "wide", "written", "length", "reason", "kept", "interest", "arms", "brother", "race", "present", "beautiful", "store", "job", "edge", "past", "sign", "record", "finished", "discovered", "wild", "happy",
    "beside", "gone", "sky", "glass", "million", "west", "lay", "weather", "root", "instruments", "meet", "third", "months", "paragraph", "raised", "represent", "soft", "whether", "clothes", "flowers", "shall", "teacher", "held", "describe", "drive",
    "cross", "speak", "solve", "appear", "metal", "son", "either", "ice", "sleep", "village", "factors", "result", "jumped", "snow", "ride", "care", "floor", "hill", "pushed", "baby", "buy", "century", "outside", "everything", "tall",
    "already", "instead", "phrase", "soil", "bed", "copy", "free", "hope", "spring", "case", "laughed", "nation", "quite", "type", "themselves", "temperature", "bright", "lead", "everyone", "method", "section", "lake", "consonant", "within", "dictionary",
    "hair", "age", "amount", "scale", "pounds", "although", "per", "broken", "moment", "tiny", "possible", "gold", "milk", "quiet", "natural", "lot", "stone", "act", "build", "middle", "speed", "count", "cat", "someone", "sail",
    "rolled", "bear", "wonder", "smiled", "angle", "fraction", "Africa", "killed", "melody", "bottom", "trip", "hole", "poor", "fight", "surprise", "French", "died", "beat", "exactly", "remain", "dress", "iron", "fingers",
    "row", "least", "catch", "climbed", "wrote", "shouted", "continued", "itself", "else", "plains", "gas", "England", "burning", "design", "joined", "foot", "law", "ears", "grass", "grew", "skin", "valley", "cents", "key",
    "president", "brown", "trouble", "cool", "cloud", "lost", "sent", "symbols", "wear", "bad", "save", "experiment", "engine", "alone", "drawing", "east", "pay", "single", "touch", "information", "express", "mouth", "yard", "equal", "decimal",
    "yourself", "control", "practice", "report", "straight", "rise", "statement", "stick", "party", "seeds", "suppose", "woman", "coast", "bank", "period", "wire", "choose", "clean", "visit", "bit", "whose", "received", "garden", "please", "strange",
    "caught", "fell", "team", "God", "captain", "direct", "ring", "serve", "child", "desert", "increase", "history", "cost", "maybe", "business", "separate", "break", "uncle", "hunting", "flow", "lady", "students", "human", "art", "feeling",
    "supply", "corner", "electric", "insects", "crops", "tone", "hit", "sand", "doctor", "provide", "thus", "cook", "bones", "tail", "board", "modern", "compound", "mine", "fit", "addition", "belong", "safe", "soldiers",
    "guess", "silent", "trade", "rather", "compare", "crowd", "poem", "enjoy", "elements", "indicate", "except", "expect", "flat", "seven", "interesting", "sense", "string", "blow", "famous", "value", "wings", "movement", "pole", "exciting", "branches",
    "thick", "blood", "lie", "spot", "bell", "fun", "loud", "consider", "suggested", "thin", "position", "entered", "fruit", "tied", "rich", "dollars", "send", "sight", "chief", "Japanese", "stream", "planets", "rhythm", "eight", "science",
    "major", "observe", "tube", "necessary", "weight", "meat", "lifted", "process", "army", "hat", "property", "particular", "swim", "terms", "current", "park", "sell", "shoulder", "industry", "wash", "block", "spread", "cattle", "wife", "sharp",
    "company", "radio", "action", "capital", "factories", "settled", "yellow", "southern", "truck", "fair", "printed", "ahead", "chance", "born", "level", "triangle", "molecules", "France", "repeated", "column", "western", "church",
    "sister", "oxygen", "plural", "various", "agreed", "opposite", "wrong", "chart", "prepared", "pretty", "solution", "fresh", "shop", "suffix", "especially", "shoes", "actually", "nose", "afraid", "dead", "sugar", "adjective", "fig", "office", "huge",
    "gun", "similar", "death", "score", "forward", "stretched", "experience", "rose", "allow", "fear", "workers", "Washington", "Greek", "women", "bought", "led", "march", "northern", "create", "British", "difficult", "match", "win", "steel",
    "total", "deal", "determine", "evening", "nor", "rope", "cotton", "apple", "details", "entire", "corn", "substances", "smell", "tools", "conditions", "cows", "track", "arrived", "located", "sir", "seat", "division", "effect", "underline", "view", "python", "developer", "hangman", "challenge", "programming", "education"]
    return random.choice(words)

def display_word(word, guessed_letters):
    return " ".join(letter if letter in guessed_letters else "_" for letter in word)

def init_game():
    session['word'] = choose_word()
    session['guessed_letters'] = []
    session['attempts'] = 6

@app.route('/start', methods=['GET'])
def start():
    return render_template("start.html")

@app.route('/', methods=['GET'])
def index():
    init_game()
    word = session['word']
    guessed_letters = set(session.get('guessed_letters', []))
    attempts = session.get('attempts', 6)
    current_display = display_word(word, guessed_letters)
    message = ""
    game_over = False

    return render_template("index.html",
                           current_display=current_display,
                           guessed_letters=sorted(guessed_letters),
                           attempts=attempts,
                           message=message,
                           game_over=game_over)

@app.route('/guess', methods=['POST'])
def make_guess():
    data = request.get_json()
    guess = data.get("guess", "").lower().strip()
    word = session.get('word')
    guessed_letters = set(session.get('guessed_letters', []))
    attempts = session.get('attempts', 6)
    message = ""

    if not guess or len(guess) != 1 or not guess.isalpha():
        message = "Please enter a valid single letter."
    elif guess in guessed_letters:
        message = f"You already guessed '{guess}'."
    else:
        guessed_letters.add(guess)
        session['guessed_letters'] = list(guessed_letters)
        if guess not in word:
            attempts -= 1
            session['attempts'] = attempts
            message = f"Wrong guess! Attempts left: {attempts}"
        else:
            message = "Good guess!"

    current_display = display_word(word, guessed_letters)

    if all(letter in guessed_letters for letter in word):
        message = f"Congratulations! You guessed the word: {word}"
        game_over = True
    elif attempts <= 0:
        message = f"Game over! The word was: {word}"
        game_over = True
    else:
        game_over = False

    image_url = url_for('static', filename=f"images/hangman-{attempts}.png")
    return {
        "current_display": current_display,
        "guessed_letters": sorted(guessed_letters),
        "attempts": attempts,
        "message": message,
        "game_over": game_over,
        "image_url": image_url
    }

if __name__ == '__main__':
    app.run(debug=True, port=5001)
