import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass';

import { ReactThreeFiber } from 'react-three-fiber';

declare global {
  namespace JSX {
    export interface IntrinsicElements {
      effectComposer: ReactThreeFiber.Node<EffectComposer, typeof EffectComposer>
      renderPass: ReactThreeFiber.Node<RenderPass, typeof RenderPass>
      shaderPass: ReactThreeFiber.Node<ShaderPass, typeof ShaderPass>
      savePass: ReactThreeFiber.Node<SavePass, typeof SavePass>
    }
  }
}
