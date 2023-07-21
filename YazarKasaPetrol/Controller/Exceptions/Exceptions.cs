using System.Collections;
using System.Runtime.Serialization;

namespace YazarKasaPetrol.Controller.Exceptions
{
    [Serializable]
    public class LogsNotFoundException : Exception
    {
        public new string? Message { get; set; }

        public LogsNotFoundException()
        {

        }

        public LogsNotFoundException(string? message) : base(message)
        {
            if (message == "logsNotFound") 
            {
                Message = "Logların dosyası bulunamamıştır. Lütfen teknik servisi arayınız.";
            }
        }
    }

    [Serializable]
    public class ApplicationIdException : Exception
    {
        public new string? Message { get; set; }
        public int? Index { get; set; }

        public ApplicationIdException()
        {

        }

        public ApplicationIdException(string? message, int? index)
        {
            if (message == "appIdError")
            {
                Message = "Uygulamanızın AppId'si hatalıdır. Lütfen teknik servisi arayınız.";
                Index = index;
            }
        }

        public void WriteMessage() 
        {
            Console.WriteLine("***********************************************************************");
            Console.WriteLine(Message + "\nHATA KODU : " + Index);
            Console.WriteLine("***********************************************************************");   
        }
    }
}
