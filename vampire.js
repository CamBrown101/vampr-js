class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    const thisNumber = this.numberOfVampiresFromOriginal
    const passedNumber = vampire.numberOfVampiresFromOriginal
    return thisNumber < passedNumber
  }



  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (name === this.name) {
      return this
    }
    for (const offspring of this.offspring) {
      let found = offspring.vampireWithName(name)
      if (found) {
        return found
      }
    }
    return null
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let numberOfOffspring = 0;

    for (const children of this.offspring) {
      numberOfOffspring += 1;
      numberOfOffspring += children.totalDescendents;
    }
    return numberOfOffspring
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennialVampires = [];

    if (this.yearConverted > 1980) {
      millennialVampires.push(this)
    }

    for (const children of this.offspring) {
      const millennialOffsprings = children.allMillennialVampires;
      millennialVampires = millennialVampires.concat(millennialOffsprings)
    }
    return millennialVampires;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.

  closestCommonAncestor(vampire) {
    const vampireAncestors = [];
    const thisAncestors = [];
    let closestAncestor

    //Creates function to create an array of each Vampires creators
    const createAncestors = (node, results) => {
      if (node.creator) {
        results.push(node.creator)
        createAncestors(node.creator, results)
      }
      results.push(node)
    }
    // calls to create both creator lists.
    createAncestors(this, thisAncestors);
    createAncestors(vampire, vampireAncestors);

    //compare both lists and find the first instance where they match
    thisAncestors.forEach((element) => {
      if (vampireAncestors.includes(element)) {
        closestAncestor = element;
        return closestAncestor;
      }
    })
    return closestAncestor
  }
}


let rootVampire = new Vampire("root");
const offspring2 = new Vampire("b");
const offspring1 = new Vampire("a");
const offspring3 = new Vampire("c");
const offspring4 = new Vampire("d");
const offspring5 = new Vampire("e");
const offspring6 = new Vampire("f");
const offspring7 = new Vampire("g");
const offspring8 = new Vampire("h");

rootVampire.addOffspring(offspring1);
rootVampire.addOffspring(offspring2);
rootVampire.addOffspring(offspring3);
offspring3.addOffspring(offspring4);
offspring3.addOffspring(offspring5);
offspring5.addOffspring(offspring6);
offspring6.addOffspring(offspring7);
offspring2.addOffspring(offspring8);

//should be root Vampire
console.log(offspring1.closestCommonAncestor(offspring2));
module.exports = Vampire;

