<template>
  <div :class="computeClasses" class="card">
    <div class="icons">
      <visibility-toggle
        v-if="visibilityToggle"
        :visible="visible"
      ></visibility-toggle>
    </div>
    <div @click="handleToggleVisibility">
      <img :src="back" alt="Back of a playing card" v-if="displayCardBack" />
      <img :src="faceCard" :alt="altText" v-else-if="displayCardFront" />
    </div>
    <discard-icon v-if="discardToggle" @click="handleDiscard"></discard-icon>
  </div>
</template>

<script>
import VisibilityToggle from "./VisibilityToggleIcon.vue";
import back from "../assets/back.png";
import twoOfClubs from "../assets/2_of_clubs.svg";
import threeOfClubs from "../assets/3_of_clubs.svg";
import fourOfClubs from "../assets/4_of_clubs.svg";
import fiveOfClubs from "../assets/5_of_clubs.svg";
import sixOfClubs from "../assets/6_of_clubs.svg";
import sevenOfClubs from "../assets/7_of_clubs.svg";
import eightOfClubs from "../assets/8_of_clubs.svg";
import nineOfClubs from "../assets/9_of_clubs.svg";
import tenOfClubs from "../assets/10_of_clubs.svg";
import jackOfClubs from "../assets/jack_of_clubs.svg";
import queenOfClubs from "../assets/queen_of_clubs.svg";
import kingOfClubs from "../assets/king_of_clubs.svg";
import aceOfClubs from "../assets/ace_of_clubs.svg";
import twoOfHearts from "../assets/2_of_hearts.svg";
import threeOfHearts from "../assets/3_of_hearts.svg";
import fourOfHearts from "../assets/4_of_hearts.svg";
import fiveOfHearts from "../assets/5_of_hearts.svg";
import sixOfHearts from "../assets/6_of_hearts.svg";
import sevenOfHearts from "../assets/7_of_hearts.svg";
import eightOfHearts from "../assets/8_of_hearts.svg";
import nineOfHearts from "../assets/9_of_hearts.svg";
import tenOfHearts from "../assets/10_of_hearts.svg";
import jackOfHearts from "../assets/jack_of_hearts.svg";
import queenOfHearts from "../assets/queen_of_hearts.svg";
import kingOfHearts from "../assets/king_of_hearts.svg";
import aceOfHearts from "../assets/ace_of_hearts.svg";
import twoOfSpades from "../assets/2_of_spades.svg";
import threeOfSpades from "../assets/3_of_spades.svg";
import fourOfSpades from "../assets/4_of_spades.svg";
import fiveOfSpades from "../assets/5_of_spades.svg";
import sixOfSpades from "../assets/6_of_spades.svg";
import sevenOfSpades from "../assets/7_of_spades.svg";
import eightOfSpades from "../assets/8_of_spades.svg";
import nineOfSpades from "../assets/9_of_spades.svg";
import tenOfSpades from "../assets/10_of_spades.svg";
import jackOfSpades from "../assets/jack_of_spades.svg";
import queenOfSpades from "../assets/queen_of_spades.svg";
import kingOfSpades from "../assets/king_of_spades.svg";
import aceOfSpades from "../assets/ace_of_spades.svg";
import twoOfDiamonds from "../assets/2_of_diamonds.svg";
import threeOfDiamonds from "../assets/3_of_diamonds.svg";
import fourOfDiamonds from "../assets/4_of_diamonds.svg";
import fiveOfDiamonds from "../assets/5_of_diamonds.svg";
import sixOfDiamonds from "../assets/6_of_diamonds.svg";
import sevenOfDiamonds from "../assets/7_of_diamonds.svg";
import eightOfDiamonds from "../assets/8_of_diamonds.svg";
import nineOfDiamonds from "../assets/9_of_diamonds.svg";
import tenOfDiamonds from "../assets/10_of_diamonds.svg";
import jackOfDiamonds from "../assets/jack_of_diamonds.svg";
import queenOfDiamonds from "../assets/queen_of_diamonds.svg";
import kingOfDiamonds from "../assets/king_of_diamonds.svg";
import aceOfDiamonds from "../assets/ace_of_diamonds.svg";
import DiscardIcon from "./DiscardIcon.vue";

export default {
  props: {
    display: String, // possible choices are "front", "back", "nothing"
    value: String,
    suite: String,
    small: Boolean,
    visibilityToggle: Boolean,
    visible: Boolean,
    discardToggle: Boolean,
  },
  data() {
    return {
      back,
      states: {
        front: "front",
        back: "back",
        nothing: "nothing",
      },
      cardFaces: {
        AceClub: aceOfClubs,
        TwoClub: twoOfClubs,
        ThreeClub: threeOfClubs,
        FourClub: fourOfClubs,
        FiveClub: fiveOfClubs,
        SixClub: sixOfClubs,
        SevenClub: sevenOfClubs,
        EightClub: eightOfClubs,
        NineClub: nineOfClubs,
        TenClub: tenOfClubs,
        JackClub: jackOfClubs,
        QueenClub: queenOfClubs,
        KingClub: kingOfClubs,
        AceHeart: aceOfHearts,
        TwoHeart: twoOfHearts,
        ThreeHeart: threeOfHearts,
        FourHeart: fourOfHearts,
        FiveHeart: fiveOfHearts,
        SixHeart: sixOfHearts,
        SevenHeart: sevenOfHearts,
        EightHeart: eightOfHearts,
        NineHeart: nineOfHearts,
        TenHeart: tenOfHearts,
        JackHeart: jackOfHearts,
        QueenHeart: queenOfHearts,
        KingHeart: kingOfHearts,
        AceSpade: aceOfSpades,
        TwoSpade: twoOfSpades,
        ThreeSpade: threeOfSpades,
        FourSpade: fourOfSpades,
        FiveSpade: fiveOfSpades,
        SixSpade: sixOfSpades,
        SevenSpade: sevenOfSpades,
        EightSpade: eightOfSpades,
        NineSpade: nineOfSpades,
        TenSpade: tenOfSpades,
        JackSpade: jackOfSpades,
        QueenSpade: queenOfSpades,
        KingSpade: kingOfSpades,
        AceDiamond: aceOfDiamonds,
        TwoDiamond: twoOfDiamonds,
        ThreeDiamond: threeOfDiamonds,
        FourDiamond: fourOfDiamonds,
        FiveDiamond: fiveOfDiamonds,
        SixDiamond: sixOfDiamonds,
        SevenDiamond: sevenOfDiamonds,
        EightDiamond: eightOfDiamonds,
        NineDiamond: nineOfDiamonds,
        TenDiamond: tenOfDiamonds,
        JackDiamond: jackOfDiamonds,
        QueenDiamond: queenOfDiamonds,
        KingDiamond: kingOfDiamonds,
      },
    };
  },
  computed: {
    computeClasses() {
      return `${this.states[this.display]} ${this.small ? "small" : ""}`;
    },
    displayCardBack() {
      return this.display == this.states.back;
    },
    displayCardFront() {
      return this.display == this.states.front;
    },
    faceCard() {
      return this.cardFaces[`${this.value}${this.suite}`];
    },
    altText() {
      return `${this.value} of ${this.suite}`;
    },
  },
  components: {
    VisibilityToggle,
    DiscardIcon,
  },
  methods: {
    handleToggleVisibility() {
      this.$emit("click", {
        value: this.value,
        suite: this.suite,
        visible: this.visible,
      });
    },
    handleDiscard() {
      this.$emit("discard", {
        value: this.value,
        suite: this.suite,
        visible: this.visible,
      });
    },
  },
};
</script>

<style scoped>
img {
  width: 100%;
}

div {
  width: 2.5rem;
  height: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.nothing {
  border: 1px solid green;
  border-radius: 10px;
}

.small {
  width: 1.5rem;
  height: 2rem;
}

.icons {
  display: flex;
  flex-direction: row;
}

.card {
  margin-bottom: 0.5rem;
}
</style>
