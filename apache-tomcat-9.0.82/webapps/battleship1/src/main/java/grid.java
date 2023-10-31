

import java.util.ArrayList;
import java.util.HashMap;

public class grid {
    box[][] board;
    int rows;
    int cols;

    grid(){
        board = new box[10][10];
        rows = 10;
        cols=10;
        for(int i = 0;i<this.rows;i++){
            for(int j = 0;j<this.cols;j++){
                board[i][j] = new box("0",0,i,j);
            }
        }
    };

    void placeShips(ArrayList<Integer> ships){
        Integer x = 0;
        for (Integer integer : ships) {
            x+=integer;
        }

        if(rows*cols<x){
            return;
        }

        gridBuilder manager = new gridBuilder();

        while(ships.size()>0){
            int ship_number = (int)(Math.round(Math.random() * (ships.size()-1)));
            int random_ship = ships.get(ship_number);
            boolean placed = false;
            while(!placed){
                int random_row = (int)(Math.random()*(this.board.length-2) +1);
                int random_col = (int)(Math.random()*(this.board.length-2) +1);
                ArrayList<String> possible = new ArrayList<String>();

                if(manager.placeUp(this.board,random_row, random_col,random_ship)){
                    possible.add("up");
                }
                if(manager.placeDown(this.board,random_row, random_col,random_ship)){
                    possible.add("down");
                }
                if(manager.placeLeft(this.board,random_row, random_col,random_ship)){
                    possible.add("left");
                }
                if(manager.placeRight(this.board,random_row, random_col,random_ship)){
                    possible.add("right");
                }
                if(possible.size()>0){
                    String random_dir = possible.get((int)Math.round(Math.random() * (possible.size()-1)));
                    this.board = manager.placeShip(this.board, random_row, random_col, random_ship,random_dir);
                    ships.remove(ship_number);
                    placed=true;
                }       
            }
        }
    }


    void placeShips(HashMap<String,Integer> ships){
        Integer x = 0;
        for (Integer integer : ships.values()) {
            x+=integer;
        }
        if(rows*cols<x){
            return;
        }

        gridBuilder manager = new gridBuilder();

        while(ships.size()>0){
            int random_ship = ships.values().iterator().next();
            boolean placed = false;
            while(!placed){
                int random_row = (int)(Math.random()*(this.board.length-2) +1);
                int random_col = (int)(Math.random()*(this.board.length-2) +1);
                ArrayList<String> possible = new ArrayList<String>();

                if(manager.placeUp(this.board,random_row, random_col,random_ship)){
                    possible.add("up");
                }
                if(manager.placeDown(this.board,random_row, random_col,random_ship)){
                    possible.add("down");
                }
                if(manager.placeLeft(this.board,random_row, random_col,random_ship)){
                    possible.add("left");
                }
                if(manager.placeRight(this.board,random_row, random_col,random_ship)){
                    possible.add("right");
                }
                if(possible.size()>0){
                    String random_dir = possible.get((int)Math.round(Math.random() * (possible.size()-1)));
                    while(ships.keySet().iterator().hasNext()){
                        String n = ships.keySet().iterator().next();
                        if(ships.get(n)==random_ship){
                            String value = n;
                            this.board = manager.placeShip(this.board, random_row, random_col, random_ship,value,random_dir);
                            ships.remove(value);
                            break;
                        }
                    }
                    placed=true;
                }       
            }
        }
    }

    // public static void main(String[] args) {
    //     HashMap<String,Integer> shippies = new HashMap<String,Integer>();
    //     shippies.put("A",2);
    //     shippies.put("B",3);
    //     shippies.put("C",3);
    //     shippies.put("D",4);
    //     shippies.put("E",5);
    //     MatrixPrinter x = new MatrixPrinter();
    //     grid a = new grid();
    //     a.placeShips(shippies);

    //     x.print(a);
        
    // }

}

