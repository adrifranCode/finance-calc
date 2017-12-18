var budgetController = (function(){
	console.log('hey its me budget');
	
	let Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};
	
	Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };
    
    
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };
    
	
	let Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};
	
	var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };
	
	
	//Create data structure to hold income, expenses, and totals
	let data = {
		allItems :{
			exp:[],
			inc:[]
		},
		
		totals:{
			exp:0,
			inc:0
		},
		budget: 0,
        percentage: -1
	};
	
	return {
		
		addItem: function(type, des, val){
			console.log('hey its me budget2');
			let newItem, ID;
			
			//Create a new ID
			
			if(data.allItems[type].length >0){
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}
			
			//Create new item based on inc or exp type
			if(type === 'exp') {
				
				newItem = new Expense(ID, des, val);
			} else if (type === 'inc') {
				   console.log('hey its me budget3');
					newItem = new Income(ID, des, val);
				}
			
			//push new item into data structure
			data.allItems[type].push(newItem)
			
			//return the new item
			return newItem;
		},
		
		
        deleteItem: function(type, id) {
            var ids, index;
            
            // id = 6
            //data.allItems[type][id];
            // ids = [1 2 4  8]
            //index = 3
            
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },
        
        calculateBudget: function() {
            
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            
            // Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            // calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }            
            
            // Expense = 100 and income 300, spent 33.333% = 100/300 = 0.3333 * 100
        },
        
        calculatePercentages: function() {
            
            /*
            a=20
            b=10
            c=40
            income = 100
            a=20/100=20%
            b=10/100=10%
            c=40/100=40%
            */
            
            data.allItems.exp.forEach(function(cur) {
               cur.calcPercentage(data.totals.inc);
            });
        },
        
        
        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(cur) {
                return cur.getPercentage();
            });
            return allPerc;
        },
        
        
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        }
		
	};
	
})();




export default budgetController;
