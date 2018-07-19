import { NgModule } from '@angular/core';
import { CanvasDrawComponent } from './canvas-draw/canvas-draw';

@NgModule({
	declarations: [CanvasDrawComponent],
	//mports: [CanvasDrawComponent],
	exports: [CanvasDrawComponent]
})
export class ComponentsModule {}
