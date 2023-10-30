
import java.util.HashMap;

public class Player {

    grid attackingGrid;
    grid defendingGrid;
    int ships = 5;
    HashMap<String,Integer> shippies = new HashMap<String,Integer>();

    Player(){
        attackingGrid = new grid();
        defendingGrid = new grid();
        ships = 5;
        shippies.put("A",2);
        shippies.put("B",3);
        shippies.put("C",3);
        shippies.put("D",4);
        shippies.put("E",5);
        defendingGrid.placeShips(shippies);
    }

    public static void main(String[] args) {
        Player a = new Player();
        System.out.println(a.shippies);
    }
    
}
