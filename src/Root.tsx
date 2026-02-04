import {Composition} from 'remotion';
import {AiNewsVideo, AiNewsVideoProps} from './AiNewsVideo';
import {DogStoryVideo} from './DogStoryVideo';

export const RemotionRoot = () => {
  return (
    <>
      {/* Original AI News Video */}
      <Composition
        id="AiNewsVideo"
        component={AiNewsVideo}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          headline: 'Claude 4.5 ចេញហើយ!',
          company: 'Anthropic',
          mainBenefit: 'ឥឡូវនេះអាចសរសេរកូដលឿនជាងមុន ១០ ដង',
          bulletPoints: [
            '80.9% SWE-bench score (លេខ ១របស់ពិភពលោក)',
            'ប្រើប្រាស់ token តិចជាង ៧៦%',
            'Infinite Chats - សន្ទនាបានគ្មានដែនកំណត់',
            'សរសេរ code ស្វ័យប្រវត្តិបានពេញលេញ',
          ],
          impact: 'ការងារលឿនជាងមុន ១០ ដង',
          hashtags: '#AIHunter #Claude #Anthropic #Coding',
        } satisfies AiNewsVideoProps}
      />

      {/* NEW: Dog Story Video */}
      <Composition
        id="DogStoryVideo"
        component={DogStoryVideo}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
