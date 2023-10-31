

public class game implements Runnable{

    int[] coords;
    Player opponent;
    boolean status;
    boolean hasLost;

    public game(int[] coords, Player opponent){
        this.coords = coords;
        this.opponent = opponent;
    }

    @Override
    public void run() { //Checks the current inputted coords and changes accordingly
        // SO, check value, if !=0, set status to true, end. else: set status to false. 
        // Change that value to an X. Subtract 1 from Shippies. If all values in shippies are 0,
        //  then the opponent has lost

        String value = opponent.defendingGrid.board[coords[0]][coords[1]].value;

        if(value!="0" && value!="X"){
            status = false; //Miss
        }
        else{
            status = true;
            opponent.defendingGrid.board[coords[0]][coords[1]].value = "X";
            int shipState = opponent.shippies.get(value);
            opponent.shippies.put(value, shipState-1);
            if(opponent.shippies.get(value) == 0){
                opponent.shippies.remove(value);
            }
            if(opponent.shippies.isEmpty()){
                hasLost = true;
            }
        }
    }
    public boolean hasTakenTheL(){
        return hasLost;
    }
    public void setCoords(int[] coords){
        this.coords = coords;
    }

    public void setOpponent(Player opponent){
        this.opponent = opponent;
    }

    public void setStatus(boolean state){
        status = state;
    }
}
