import type { Scene } from '../types/game';

export const act3Scenes: Record<string, Scene> = {
  end: {
    id: 'end',
    speaker: 'Narrator',
    text: 'The path to the Summit is open. The air vibrates with the raw energy of the world\'s dying memories. It is time to face the source.',
    choices: [
      { text: 'Ascend to the Summit.', nextSceneId: 'summit' },
    ],
  },
  summit: {
    id: 'summit',
    speaker: 'The Silence',
    text: 'WHY DO YOU STRUGGLE, LITTLE WEAVER? ALL SONGS MUST EVENTUALLY END. ALL MEMORIES MUST BECOME STILL.',
    choices: [
      { text: 'A song is beautiful because it ends.', nextSceneId: 'final_combat_prep' },
      { text: 'I will not let you take our past!', nextSceneId: 'final_combat_prep' },
    ],
  },
  final_combat_prep: {
    id: 'final_combat_prep',
    speaker: 'Aria',
    text: 'This is it! Use everything you have learned. Weave the world back together!',
    choices: [
      { text: 'FOR AETHERIA!', nextSceneId: 'battle_final', action: { type: 'TRIGGER_COMBAT', payload: 'the_silence' } },
    ],
  },
  battle_final: {
    id: 'battle_final',
    speaker: 'Combat',
    text: 'The Song of Restoration begins...',
    choices: [],
  },
  final_win: {
    id: 'final_win',
    speaker: 'Narrator',
    text: 'As the Silence shatters, a wave of color and sound explodes from the Spire. The world breathes again.',
    choices: [
      { text: 'What happens next?', nextSceneId: 'ending_main' },
    ],
  },
  ending_main: {
    id: 'ending_main',
    speaker: 'Aria',
    text: 'You did it, Weaver. The Silence is broken. The memories are returning, but they are new... different. We have a chance to build something better.',
    choices: [
      { text: 'Rest now.', nextSceneId: 'credits' },
      { text: 'Look to the horizon.', nextSceneId: 'credits' },
    ],
  },
  credits: {
    id: 'credits',
    speaker: 'The Echoes of Aetheria',
    text: 'Thank you for playing. The world remembers your song. \n\n Design & Development: Gemini CLI \n Story: The Weaver\'s Journey',
    choices: [
      { text: 'Play Again', nextSceneId: 'start' },
    ],
  },
};
