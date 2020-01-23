let box = {
  locked: true,
  unlock: () => this.locked = false,
  lock: () => this.locked = true,
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
}
function putStuff() {
  if (box.content().isEmpty()) {
    box._content.push('my_private_stuff');
  }
}
function withBoxUnlocked(f) {
  //box.unlock();
  try {
    f();
  }
  catch(e) {
    console.log(e);
  }
  finally {
    box.lock();
  }
}
withBoxUnlocked(putStuff);
console.log('box should still be locked: ' + box.locked);
