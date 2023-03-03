using System.Diagnostics;

namespace SICIT.MVC.UTILERIAS
{
    public static class EventLog
    {
        private static string LOG_SOURCE = "SICIT.MVC";
        private static int GENERIC_EVENT_ID = 25000;

        public static void WriteEntry(string message, EventLogEntryType eventType)
        {
            System.Diagnostics.EventLog.WriteEntry(LOG_SOURCE, message, eventType, GENERIC_EVENT_ID);
        }

    }
}