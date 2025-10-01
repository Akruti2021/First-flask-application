class Flight:

    def __init__(self, origin, destination, duration):
        self.origin = origin
        self.destination = destination
        self.duration = duration

        counter = 1
    # def __init__(self, origin, destination, duration):
        # keep track of id number
        self.id = Flight.counter
        Flight.counter += 1
        #keep track of passenger
        self.passengers = []
        #details about flight
        self.origin = origin
        self.destination = destination
        self.duration = duration


    def print_info(self):
        print(f"Flight origin: {self.origin}")
        print(f"Flight destination: {self.destination}")
        print(f"Flight duration: {self.duration}")

        print()
        print("Passengers:")
        for p in self.passengers:
            print(f"{p.name}")

    def delay(self, amount):
        self.duration += amount

    def add_passenger(self, p):
        self.passengers.append(p)
        p.flight_id = self.id

class Passenger:

    def __init__(self, name):
        self.name = name
        
def main():

    #delay flight by 10 minutes
    f1 = Flight(origin="New York", destination="Paris", duration=540)
    #create passenger
    alice = Passenger(name="Alice")
    bob = Passenger(name="Bob")
    #add passenger to flight
    f1.add_passenger(alice)
    f1.add_passenger(bob)
    #print info before delay
    f1.print_info()
    #delay flight
    f1.delay(10)
    f1.print_info()
        
    #we have 2 flights info and want to print
    f1 = Flight(origin="New York", destination="Paris", duration="540")
    f1.print_info()

    f2 = Flight(origin="Tokyo", destination="Shangai", duration="185")
    f2.print_info()

    #create flight
    #f = Flight(origin="New York", destination="Paris", duration=540)

    #change the value of a variable
    #f.duration += 10

    #print detail about flight
    # print(f.origin)
    # print(f.destination)
    # print(f.duration)

    
#its important to call the main function             
if __name__ == "__main__":
    main()