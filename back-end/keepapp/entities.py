class ReturnModel:
    CODE = ""
    RETURN_VALUE = ""
    RETURN_MESSAGE = ""

    def setCode(self , code):
        self.CODE = code

    def setValue(self , value):
        self.RETURN_VALUE = value
    
    def setMessage(self , message):
        self.RETURN_MESSAGE = message