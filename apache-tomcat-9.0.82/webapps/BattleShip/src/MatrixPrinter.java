
public class MatrixPrinter {

    void print(grid a){
        for(int i = 0; i<a.rows;i++){
            for(int j = 0;j<a.cols;j++){
                if(j==a.cols-1){
                    System.out.println(a.board[i][j].value);
                }
                else{
                    System.out.print(a.board[i][j].value +" ");
                }
            }
        } 
    }
    
}
