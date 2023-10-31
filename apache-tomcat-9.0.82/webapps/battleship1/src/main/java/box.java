
public class box {
	
    String value = "0"; //"0" = water, letter=ship
    int visibility = 0; //0== not been hit, 1==been hit
    int x = 0;
    int y = 0;


    box(){
        value = "0";
        visibility = 0;
    }

    box(String value, int visibility, int x, int y){
        this.value = value;
        this.visibility = visibility;
        this.x =x;
        this.y=y;
    }
    
}
