from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api', methods=['GET', 'POST'])
def api_endpoint():
    if request.method == 'POST':
        # Extract JSON data from the request
        data = request.json
        
        # Extract data from the request
        user_id = data.get('user_id', 'N/A')
        college_email = data.get('college_email', 'N/A')
        college_roll_number = data.get('college_roll_number', 'N/A')
        numbers = data.get('numbers', [])
        alphabets = data.get('alphabets', [])

        # Calculate the highest lowercase alphabet
        highest_lowercase_alphabet = max(
            (ch for ch in alphabets if ch.islower()), 
            default='N/A'
        )
        
        # Create response
        response = {
            'Status': 'Success',
            'User ID': user_id,
            'College Email ID': college_email,
            'College Roll Number': college_roll_number,
            'Array for numbers': numbers,
            'Array for alphabets': alphabets,
            'Array with the highest lowercase alphabet': [highest_lowercase_alphabet]
        }
        
        return jsonify(response)
    
    elif request.method == 'GET':
        # Return a fixed operation code for GET requests
        return jsonify({'operation_code': 'GET_METHOD_EXECUTED'})

if __name__ == '__main__':
    app.run(debug=True)
