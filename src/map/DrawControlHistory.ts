import { FeatureCollection } from "@turf/turf";
import * as turf from '@turf/turf';

class DrawControlHistory {

    private _history: FeatureCollection[] = [turf.featureCollection([])];
    private _position = 0;

    public hasRedo = true;
    public hasUndo = true;

    public setValue(fc: FeatureCollection) {

        // REMOVE VALUES AHEAD IF USER WENT BACK 
        if (this._history) {
            if (this._position < this._history.length - 1) {
                this._history = this._history.slice(0, this._position + 1);
            }
        }

        this._history.push(fc);
        this._position += 1;
        this._checkRedoUndo();
    };

    public undo(): FeatureCollection {
        let fc: FeatureCollection;
        if (this._position > 0) {
            this._position -= 1;
            fc = this._history[this._position];
        } else {
            fc = this._history[this._position];
        }

        this._checkRedoUndo();
        return fc;
    }

    public redo(): FeatureCollection {
        let fc: FeatureCollection;
        if (this._position < this._history.length - 1) {
            this._position += 1;
            fc = this._history[this._position];
        } else{
            fc = this._history[this._history.length - 1]
        }

        this._checkRedoUndo();
        return fc;
    }

    public setPreviousShapes = (fc: FeatureCollection) => {
        this._history[0] = fc;
    }

    private _checkRedoUndo = () => {

        if(this._position > 0){
            this.hasUndo = false;
        }else{
            this.hasUndo = true;
        }

        // if(this._position < this._history.length){
        //     this.hasRedo = false;
        // }else{
        //     this.hasRedo = true;
        // }
    }

}

export default DrawControlHistory;