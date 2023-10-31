
public class gridBuilder {

    boolean placeUp(box[][] grid,int random_row,int random_col, int random_ship){
        if(random_row<random_ship-1){
            return false;
        }
        else{
            for(int i = random_row;i>-1;i--){
                box point =grid[i][random_col];
                if (point.value!="0"){
                    return false;
                }
            }
        }
        return true;
    }
    boolean placeDown(box[][] grid,int random_row,int random_col, int random_ship){
        if((grid.length-random_row)<random_ship){
            return false;
        }
        else{
            for(int i = random_row;i<grid.length;i++){
                box point =grid[i][random_col];
                if (point.value!="0"){
                    return false;
                }
            }
        }
        return true;
    }
    
    boolean placeLeft(box[][] grid,int random_row,int random_col, int random_ship){
        if(random_col<random_ship-1){
            return false;
        }
        else{
            for(int i = random_col;i>-1;i--){
                box point =grid[random_col][i];
                if (point.value!="0"){
                    return false;
                }
            }
        }
        return true;
    }

    boolean placeRight(box[][] grid,int random_row,int random_col, int random_ship){
        if((grid.length-random_col)<random_ship){
            return false;
        }
        else{
            for(int i = random_col;i<grid[random_row].length;i++){
                box point =grid[random_row][i];
                if (point.value!="0"){
                    return false;
                }
            }
        }
        return true;
    }

    box[][] placeShip(box[][] grid,int random_row,int random_col, int random_ship, String direction){
        if(direction=="up"){
            for(int i = random_row;i>(random_row-random_ship);i--){
                grid[i][random_col].value = "1";
            }
            return grid;
        }
        else if (direction =="down"){
            for(int i = random_row;i<(random_row+random_ship);i++){
                grid[i][random_col].value="1";
            }
            return grid;
        }
        else if(direction=="left"){
            for(int i = random_col;i>random_col-random_ship;i--){
                grid[random_row][i].value="1";
            }
            return grid;
        }
        else if(direction=="right"){
            for(int i = random_col;i<random_col+random_ship;i++){
                grid[random_row][i].value="1";
            }
            return grid;
        }
        else{
            System.out.println("Something was wrong with the directions");
            return grid;
        }
    }

    box[][] placeShip(box[][] grid,int random_row,int random_col, int random_ship, String value, String direction){
        if(direction=="up"){
            for(int i = random_row;i>(random_row-random_ship);i--){
                grid[i][random_col].value = value;
            }
            return grid;
        }
        else if (direction =="down"){
            for(int i = random_row;i<(random_row+random_ship);i++){
                grid[i][random_col].value=value;
            }
            return grid;
        }
        else if(direction=="left"){
            for(int i = random_col;i>random_col-random_ship;i--){
                grid[random_row][i].value=value;
            }
            return grid;
        }
        else if(direction=="right"){
            for(int i = random_col;i<random_col+random_ship;i++){
                grid[random_row][i].value=value;
            }
            return grid;
        }
        else{
            System.out.println("Something was wrong with the directions");
            return grid;
        }
    }
}
