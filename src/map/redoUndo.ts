import { FeatureCollection } from "@turf/turf";
import * as turf from '@turf/turf';

class RedoUndo {

    private _history: FeatureCollection[] = [turf.featureCollection([])];
    private _position = 0;

    public setValue(fc: FeatureCollection) {

        // REMOVE VALUES AHEAD IF USER WENT BACK 
        if (this._history) {
            if (this._position < this._history.length - 1) {
                this._history = this._history.slice(0, this._position + 1);
            }
        }

        this._history.push(fc);
        this._position += 1;

        console.log('History ', this._history)
        console.log(`Position: ${this._position}, history: ${this._history}`)
    };

    public undo(): FeatureCollection {
        console.log('going to undo position', this._position);
        console.log('going to undo history', this._history);
        if (this._position > 0) {
            this._position -= 1;
            return this._history[this._position];
        } else {
            return this._history[this._position];
        }
    }

    public redo(): FeatureCollection {
        if (this._position < this._history.length - 1) {
            this._position += 1;

            return this._history[this._position];
        } else{
            return this._history[this._history.length - 1]
        }
    }

    public get position() {
        return this._position;
    }

    public setPreviousShapes = (fc: FeatureCollection) => {
        console.log('setting previous shapes ', fc);
        this._history[0] = fc;
    }

}

export default RedoUndo;